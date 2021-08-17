import { Authorized, Body, CurrentUser, Delete, Get, JsonController, OnUndefined, Param, Patch, Post, QueryParams, UseInterceptor } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import _ from 'lodash';
import { AreaService, CListData } from '../services';
import { Area } from '../models';
import { AreaNotFoundError } from '../errors';
import { ClassTransformerInterceptor, ListResponseInterceptor } from '../interceptors';
import { BaseQuery, FullQuery, CreateAreaBody, UpdateAreaBody } from './requests';
import { ErrorResponse, AreaResponse, AreaDetailResponse } from './responses';
import { ParseHelper } from '../services/common';
import { AuthHelper } from '../../auth/AuthHelper';
import { AreaRepository } from '../repositories';
import { OrmRepository } from 'typeorm-typedi-extensions';

@Authorized()
@JsonController('/areas')
@ResponseSchema(ErrorResponse, {statusCode: 401})
@ResponseSchema(ErrorResponse, {statusCode: 404})
@ResponseSchema(ErrorResponse, {statusCode: 500})
export class AreaController {
    constructor(
        private areaService: AreaService,
        private parseHelper: ParseHelper,
        @OrmRepository()
        private areaRepository: AreaRepository
        ) {
    }

    @Get()
    @OpenAPI({
        description: `\n
                      example order: {"createdAt": -1}, \n
                      example select: ["id", "name", "code", "productObjectsTotal"], \n
                      example where: {"farmID": "uuid example"} (need farmID to check auth owner farm)\n
                      example relations: ["medias", "productObjects"], \n
                      type: 0: 'field area', 1: 'farming area', 2: 'production area', 3: 'field & product area', 4: 'field & production area', 5: 'others', \n
                      status: 0: 'activate', 1: 'deactivate', \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'`,
    })
    @UseInterceptor(ClassTransformerInterceptor(AreaResponse))
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(AreaNotFoundError)
    @ResponseSchema(AreaResponse, {isArray: true})
    public find(
        @QueryParams() query: FullQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<CListData<Area> | undefined> {
        const queryParse = this.parseHelper.fullQueryParam(query);
        // AuthHelper.authQueryByWhereParam(queryParse.where, user, { inEntity: 'farmID', inUser: 'farmID' });

        return this.areaService.find(queryParse);
    }

    @Post()
    @OpenAPI({
        description: `\n
                      fields optional: employeeID, locationID, medias, code, type, description, address, latitude, longitude,
                      productObjectsTotal, createdAt, updatedAt, deletedAt, status \n
                      type: 0: 'field area', 1: 'farming area', 2: 'production area', 3: 'field & product area', 4: 'field & production area', 5: 'others', \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'`,
    })
    @OnUndefined(AreaNotFoundError)
    @ResponseSchema(AreaResponse)
    public async create(
        @CurrentUser({required: true}) user: any,
        @Body({required: true}) body: CreateAreaBody
    ): Promise<Area | undefined> {
        AuthHelper.authQuery(body.farmID, 'farmID', user);
        const area = new Area();
        _.assign(area, body);

        return this.areaService.create(area, body.medias);
    }

    @Get('/:id')
    @OpenAPI({
        description: `\n
                      example select: ["id", "name", "code", "productObjectsTotal"], \n
                      example relations: ["medias", "farm", "location", "employee"], \n
                      type: 0: 'field area', 1: 'farming area', 2: 'production area', 3: 'field & product area', 4: 'field & production area', 5: 'others', \n
                      status: 0: 'activate', 1: 'deactivate', \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'`,
    })

    @UseInterceptor(ClassTransformerInterceptor(AreaDetailResponse))
    @OnUndefined(AreaNotFoundError)
    @ResponseSchema(AreaDetailResponse)
    public async findOne(
        @Param('id') id: string,
        @QueryParams() query: BaseQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<Area | undefined> {
        const queryParse = this.parseHelper.baseQueryParam(query);
        await AuthHelper.authQueryNeedFinding(this.areaRepository, id, {inEntity: 'farmID', inUser: 'farmID'}, user);

        return await this.areaService.findOne(id, queryParse);
    }

    @Patch('/:id')
    @OnUndefined(AreaNotFoundError)
    @ResponseSchema(AreaResponse)
    public async update(
        @Param('id') id: string,
        @Body({required: true}) body: UpdateAreaBody,
        @CurrentUser({required: true}) user: any
    ): Promise<Area | undefined> {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);

        await AuthHelper.authQueryNeedFinding(this.areaRepository, id, {inEntity: 'farmID', inUser: 'farmID'}, user);

        if (bodyParse.farmID) {
            AuthHelper.authQuery(bodyParse.farmID, 'farmID', user);
        }

        return this.areaService.update(id, bodyParse);
    }

    @Delete('/:id')
    @OnUndefined(AreaNotFoundError)
    public async delete(
        @Param('id') id: string,
        @CurrentUser({required: true}) user: any
    ): Promise<Area | undefined> {
        await AuthHelper.authQueryNeedFinding(
            this.areaRepository,
            id,
            {
                inEntity: 'farmID',
                inUser: 'farmID',
            },
            user);

        return this.areaService.delete(id);
    }
}
