import {
    Authorized,
    Body,
    CurrentUser,
    Delete,
    Get,
    JsonController,
    OnUndefined,
    Param,
    Patch,
    Post,
    QueryParams,
    UseInterceptor
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { CListData, DiaryService } from '../services';
import { Diary } from '../models';
import { DiaryNotFoundError } from '../errors';
import { ClassTransformerInterceptor, ListResponseInterceptor } from '../interceptors';
import { ErrorResponse, DiaryResponse } from './responses';
import { BaseQuery, FullQuery, CreateDiaryBody, UpdateDiaryBody } from './requests';
import _ from 'lodash';
import { ParseHelper } from '../services/common';
import { AuthHelper } from '../../auth/AuthHelper';
import { DiaryRepository, ProductObjectRepository, SectionRepository, StepRepository } from '../repositories';
import { OrmRepository } from 'typeorm-typedi-extensions';

@JsonController('/diaries')
@ResponseSchema(ErrorResponse, {statusCode: 401})
@ResponseSchema(ErrorResponse, {statusCode: 404})
@ResponseSchema(ErrorResponse, {statusCode: 500})
export class DiaryController {
    constructor(
        private diaryService: DiaryService,
        private parseHelper: ParseHelper,
        @OrmRepository()
        private sectionRepository: SectionRepository,
        @OrmRepository()
        private stepRepository: StepRepository,
        @OrmRepository()
        private diaryRepository: DiaryRepository,
        @OrmRepository()
        private productObjectRepository: ProductObjectRepository
    ) {
    }

    // example where: { "step": {"process": {"farmID": "uuid example"}}} (need farmID to check auth owner farm)
    @Get()
    @OpenAPI({
        description: `\n
                      example order: {"createdAt": -1}, \n
                      example select: ["id", "name"], \n
                      example where: { "stepID": "uuid example", "sectionID": "uuid example" } \n`,
    })
    @UseInterceptor(ClassTransformerInterceptor(DiaryResponse))
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(DiaryNotFoundError)
    @ResponseSchema(DiaryResponse, {isArray: true})
    public find(
        @QueryParams() query: FullQuery
    ): Promise<CListData<Diary> | undefined> {
        const queryParse = this.parseHelper.fullQueryParam(query);
        // AuthHelper.authQueryByWhereParam(queryParse.where, user, {inEntity: 'step.process.farmID', inUser: 'farmID'});

        return this.diaryService.find(queryParse);
    }

    @Authorized()
    @Post()
    @OpenAPI({
        description: `\n
                      fields optional: sectionID, productObjectID, description, urls, createdAt`,
    })
    @OnUndefined(DiaryNotFoundError)
    @ResponseSchema(DiaryResponse)
    public async create(
        @Body({required: true}) body: CreateDiaryBody,
        @CurrentUser({required: true}) user: any
    ): Promise<Diary | any> {
        const { productObjectID, sectionID, stepID } = body;

        if (sectionID) {
            await AuthHelper.authQueryNeedFinding(
                this.sectionRepository,
                sectionID,
                {
                    inEntity: 'process.farmID',
                    inUser: 'farmID',
                },
                user,
                ['process']
            );
        }

        if (productObjectID) {
            await AuthHelper.authQueryNeedFinding(
                this.productObjectRepository,
                productObjectID,
                {
                    inEntity: 'product.farmID',
                    inUser: 'farmID',
                },
                user,
                ['product']
            );
        }

        await AuthHelper.authQueryNeedFinding(
            this.stepRepository,
            stepID,
            {
                inEntity: 'process.farmID',
                inUser: 'farmID',
            },
            user,
            ['process']
        );

        const diary = new Diary();
        _.assign(diary, body);

        return this.diaryService.create(diary, productObjectID);
    }

    @Get('/:id')
    @UseInterceptor(ClassTransformerInterceptor(DiaryResponse))
    @OnUndefined(DiaryNotFoundError)
    @ResponseSchema(DiaryResponse)
    public async findOne(
        @Param('id') id: string,
        @QueryParams() query: BaseQuery
    ): Promise<Diary | undefined> {
        const queryParse = this.parseHelper.baseQueryParam(query);

        return await this.diaryService.findOne(id, queryParse);
    }

    @Authorized()
    @Patch('/:id')
    @OnUndefined(DiaryNotFoundError)
    @ResponseSchema(DiaryResponse)
    public async update(
        @Param('id') id: string,
        @Body({required: true}) body: UpdateDiaryBody,
        @CurrentUser({required: true}) user: any
    ): Promise<Diary | undefined> {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);

        const awaiters = [];
        awaiters.push(AuthHelper.authQueryNeedFinding(
            this.diaryRepository,
            id,
            {
                inEntity: 'section.process.farmID',
                inUser: 'farmID',
            },
            user,
            ['section', 'section.process']
        ));

        if (bodyParse.sectionID) {
            awaiters.push(AuthHelper.authQueryNeedFinding(
                this.sectionRepository,
                bodyParse.sectionID,
                {
                    inEntity: 'process.farmID',
                    inUser: 'farmID',
                },
                user,
                ['process']
            ));
        }

        if (bodyParse.stepID) {
            awaiters.push(AuthHelper.authQueryNeedFinding(
                this.stepRepository,
                bodyParse.stepID,
                {
                    inEntity: 'process.farmID',
                    inUser: 'farmID',
                },
                user,
                ['process']
            ));
        }

        await Promise.all(awaiters);

        return this.diaryService.update(id, bodyParse);
    }

    @Authorized()
    @Delete('/:id')
    @OnUndefined(DiaryNotFoundError)
    public async delete(
        @Param('id') id: string,
        @CurrentUser({required: true}) user: any
    ): Promise<Diary | undefined> {
        await AuthHelper.authQueryNeedFinding(
            this.diaryRepository,
            id,
            {
                inEntity: 'section.process.farmID',
                inUser: 'farmID',
            },
            user,
            ['section', 'section.process']
        );

        return this.diaryService.delete(id);
    }
}
