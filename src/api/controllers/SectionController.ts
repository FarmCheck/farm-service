import {
    Authorized,
    Body, CurrentUser,
    Delete,
    Get,
    JsonController,
    OnUndefined,
    Param,
    Patch,
    Post,
    QueryParams,
    UseInterceptor,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import _ from 'lodash';
import { SectionService, CListData } from '../services';
import { Section } from '../models';
import { SectionNotFoundError } from '../errors';
import { ListResponseInterceptor } from '../interceptors';
import { ErrorResponse, DiaryBaseResponse, SectionResponse, SectionDetailResponse } from './responses';
import { BaseQuery, FullQuery, UpdateSectionBody, CreateSectionBody } from './requests';
import { plainToClass } from 'class-transformer';
import { ParseHelper } from '../services/common';
import { ClassTransformerInterceptor } from '../interceptors';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { AreaRepository, ProcessRepository, ProductObjectRepository, SectionRepository } from '../repositories';
import { AuthHelper } from '../../auth/AuthHelper';
import { DiariesPortalResponse } from './responses/PortalResponse';

@JsonController('/sections')
@ResponseSchema(ErrorResponse, {statusCode: 401})
@ResponseSchema(ErrorResponse, {statusCode: 404})
@ResponseSchema(ErrorResponse, {statusCode: 500})
export class SectionController {
    constructor(
        private sectionService: SectionService,
        private parseHelper: ParseHelper,
        @OrmRepository()
        private productObjectRepository: ProductObjectRepository,
        @OrmRepository()
        private processRepository: ProcessRepository,
        @OrmRepository()
        private areaRepository: AreaRepository,
        @OrmRepository()
        private sectionRepository: SectionRepository
    ) {
    }

    @Authorized()
    @Get()
    @OpenAPI({
        description: `\n
                      example order: {"createdAt": -1}, \n
                      example select: ["id", "name", "code"], \n
                      example where: { "process": {"farmID": "uuid example"}, "productObjectID": "uuid example"} (need farmID to check auth owner farm), \n
                      status: 0: 'activate', 1: 'deactivate' \n`,
    })
    @UseInterceptor(ClassTransformerInterceptor(SectionResponse))
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(SectionNotFoundError)
    @ResponseSchema(SectionResponse, {isArray: true})
    public find(
        @QueryParams() query: FullQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<CListData<Section> | undefined> {
        const queryParse = this.parseHelper.fullQueryParam(query);
        // AuthHelper.authQueryByWhereParam(queryParse.where, user, { inEntity: 'process.farmID', inUser: 'farmID' });

        return this.sectionService.find(queryParse);
    }

    @Authorized()
    @Post()
    @OpenAPI({
        description: `\n
                      fields optional: status, type, createdAt`,
    })
    @OnUndefined(SectionNotFoundError)
    @ResponseSchema(SectionResponse)
    public async create(
        @Body({required: true}) body: CreateSectionBody,
        @CurrentUser({required: true}) user: any
    ): Promise<Section | undefined> {
        await Promise.all([
            AuthHelper.authQueryNeedFinding(this.productObjectRepository, body.productObjectID, {inEntity: 'area.farmID', inUser: 'farmID'}, user, ['area']),
            AuthHelper.authQueryNeedFinding(this.processRepository, body.processID, {inEntity: 'farmID', inUser: 'farmID'}, user),
            AuthHelper.authQueryNeedFinding(this.areaRepository, body.areaID, {inEntity: 'farmID', inUser: 'farmID'}, user),
        ]);

        const section = new Section();
        _.assign(section, body);

        return this.sectionService.create(section);
    }

    @Authorized()
    @Get('/:id')
    @UseInterceptor(ClassTransformerInterceptor(SectionDetailResponse))
    @OnUndefined(SectionNotFoundError)
    @ResponseSchema(SectionDetailResponse)
    public async findOne(
        @Param('id') id: string,
        @QueryParams() query: BaseQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<Section | undefined> {
        await AuthHelper.authQueryNeedFinding(this.sectionRepository, id, {inEntity: 'area.farmID', inUser: 'farmID'}, user, ['area']);
        const queryParse = this.parseHelper.baseQueryParam(query);

        return await this.sectionService.findOne(id, queryParse);
    }

    @Authorized()
    @Get('/:id/diaries')
    @ClassTransformerInterceptor(DiariesPortalResponse)
    @OnUndefined(SectionNotFoundError)
    @ResponseSchema(DiariesPortalResponse)
    public async findDiaries(
        @Param('id') id: string,
        @CurrentUser({ required: true }) user: any
    ): Promise<DiariesPortalResponse | undefined> {
        await AuthHelper.authQueryNeedFinding(
            this.sectionRepository,
            id,
            {
                inEntity: 'area.farmID',
                inUser: 'farmID',
            },
            user,
            ['area']
        );
        return await this.sectionService.findStepsWithDiaries(id);
    }

    @Get('/:id/check/:stepID/diaries')
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(SectionNotFoundError)
    @ResponseSchema(DiaryBaseResponse, {isArray: true})
    public async recheckDiaries(
        @Param('id') sectionID: string,
        @Param('stepID') stepID: string,
        @QueryParams() query: FullQuery
    ): Promise<CListData<DiaryBaseResponse> | undefined> {
        // await AuthHelper.authQueryNeedFinding(this.sectionRepository, sectionID, {inEntity: 'area.farmID', inUser: 'farmID'}, user, ['area']);
        const {list, count} = await this.sectionService.recheckDiariesByStep(sectionID, stepID, query);
        const resList = list.map(diary => plainToClass(DiaryBaseResponse, diary));
        return {
            list: resList,
            count,
        };
    }

    @Authorized()
    @Patch('/:id')
    @OnUndefined(SectionNotFoundError)
    @ResponseSchema(SectionResponse)
    public async update(
        @Param('id') id: string,
        @Body({required: true}) body: UpdateSectionBody,
        @CurrentUser({required: true}) user: any
    ): Promise<Section | undefined> {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);

        const awaiters = [];
        awaiters.push(AuthHelper.authQueryNeedFinding(this.sectionRepository, id, {inEntity: 'area.farmID', inUser: 'farmID'}, user, ['area']));

        if (bodyParse.productObjectID) {
            awaiters.push(AuthHelper.authQueryNeedFinding(
                this.productObjectRepository,
                bodyParse.productObjectID,
                {inEntity: 'area.farmID', inUser: 'farmID'},
                user,
                ['area']));
        }

        if (bodyParse.processID) {
            awaiters.push(AuthHelper.authQueryNeedFinding(this.processRepository, bodyParse.processID, {inEntity: 'farmID', inUser: 'farmID'}, user));
        }

        if (bodyParse.areaID) {
            awaiters.push(AuthHelper.authQueryNeedFinding(this.areaRepository, bodyParse.areaID, {inEntity: 'farmID', inUser: 'farmID'}, user));
        }

        await Promise.all(awaiters);

        return this.sectionService.update(id, bodyParse);
    }

    @Authorized()
    @Delete('/:id')
    @OnUndefined(SectionNotFoundError)
    public async delete(
        @Param('id') id: string,
        @CurrentUser({required: true}) user: any
    ): Promise<Section | undefined> {
        await AuthHelper.authQueryNeedFinding(this.sectionRepository, id, {inEntity: 'area.farmID', inUser: 'farmID'}, user, ['area']);

        return this.sectionService.delete(id);
    }
}
