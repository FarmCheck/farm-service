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
import { FarmCategoryService, CListData } from '../services';
import { FarmCategory } from '../models';
import { FarmCategoryNotFoundError } from '../errors';
import { ClassTransformerInterceptor, ListResponseInterceptor } from '../interceptors';
import { ErrorResponse, FarmCategoryResponse, BaseFarmCategory } from './responses';
import { BaseQuery, FullQuery, UpdateFarmCategoryBody } from './requests';
import { ParseHelper } from '../services/common';
import { AuthHelper } from '../../auth/AuthHelper';
import { FarmCategoryRepository } from '../repositories';
import { OrmRepository } from 'typeorm-typedi-extensions';

@Authorized()
@JsonController('/farm-categories')
@ResponseSchema(ErrorResponse, {statusCode: 401})
@ResponseSchema(ErrorResponse, {statusCode: 404})
@ResponseSchema(ErrorResponse, {statusCode: 500})
export class FarmCategoryController {
    constructor(
        private farmCategoryService: FarmCategoryService,
        private parseHelper: ParseHelper,
        @OrmRepository()
        private farmCategoryRepository: FarmCategoryRepository
    ) {
    }

    @Get()
    @OpenAPI({
        description: `\n
                      example where: {"farmID": "uuid example"} (need farmID to check auth owner farm)\n`,
    })
    @UseInterceptor(ClassTransformerInterceptor(FarmCategoryResponse))
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(FarmCategoryNotFoundError)
    @ResponseSchema(FarmCategoryResponse, {isArray: true})
    public find(
        @QueryParams() query: FullQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<CListData<FarmCategory> | undefined> {
        const queryParse = this.parseHelper.fullQueryParam(query);
        AuthHelper.authQueryByWhereParam(queryParse.where, user, {inEntity: 'farmID', inUser: 'farmID'});

        return this.farmCategoryService.find(queryParse);
    }

    @Post()
    @OnUndefined(FarmCategoryNotFoundError)
    @ResponseSchema(FarmCategoryResponse)
    public create(
        @Body({required: true}) body: BaseFarmCategory,
        @CurrentUser({required: true}) user: any
    ): Promise<FarmCategory | undefined> {
        AuthHelper.authQuery(body.farmID, 'farmID', user);
        const farmCategory = new FarmCategory();
        _.assign(farmCategory, body);

        return this.farmCategoryService.create(farmCategory);
    }

    @Get('/:id')
    @UseInterceptor(ClassTransformerInterceptor(FarmCategoryResponse))
    @OnUndefined(FarmCategoryNotFoundError)
    @ResponseSchema(FarmCategoryResponse)
    public async findOne(
        @Param('id') id: string,
        @QueryParams() query: BaseQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<FarmCategory | undefined> {
        await AuthHelper.authQueryNeedFinding(this.farmCategoryRepository, id, {inEntity: 'farmID', inUser: 'farmID'}, user);
        const queryParse = this.parseHelper.baseQueryParam(query);

        return await this.farmCategoryService.findOne(id, queryParse);
    }

    @Patch('/:id')
    @OnUndefined(FarmCategoryNotFoundError)
    @ResponseSchema(FarmCategoryResponse)
    public async update(
        @Param('id') id: string,
        @Body({required: true}) body: UpdateFarmCategoryBody,
        @CurrentUser({required: true}) user: any
    ): Promise<FarmCategory | undefined> {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);

        await AuthHelper.authQueryNeedFinding(this.farmCategoryRepository, id, {inEntity: 'farmID', inUser: 'farmID'}, user);

        if (bodyParse.farmID) {
            AuthHelper.authQuery(bodyParse.farmID, 'farmID', user);
        }

        return this.farmCategoryService.update(id, bodyParse);
    }

    @Delete('/:id')
    @OnUndefined(FarmCategoryNotFoundError)
    public async delete(
        @Param('id') id: string,
        @CurrentUser({required: true}) user: any
    ): Promise<FarmCategory | undefined> {
        await AuthHelper.authQueryNeedFinding(this.farmCategoryRepository, id, {inEntity: 'farmID', inUser: 'farmID'}, user);

        return this.farmCategoryService.delete(id);
    }
}
