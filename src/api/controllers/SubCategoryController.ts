import {
    Authorized,
    Body,
    Delete,
    Get,
    JsonController,
    OnUndefined,
    Param,
    Patch,
    Post,
    QueryParams, UseBefore,
    UseInterceptor,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import _ from 'lodash';
import { SubCategoryService, CListData } from '../services';
import { SubCategory } from '../models';
import { SubCategoryNotFoundError } from '../errors';
import { ClassTransformerInterceptor, ListResponseInterceptor } from '../interceptors';
import { ErrorResponse, SubCategoryResponse } from './responses';
import { BaseQuery, FullQuery, CreateSubCategoryBody, UpdateSubCategoryBody } from './requests';
import { ParseHelper } from '../services/common';
import { CheckRoleFuncMiddleware } from '../middlewares';
import { UserRoles } from '../middlewares/CheckRoleFuncMiddleware';

@Authorized()
@JsonController('/sub-categories')
@ResponseSchema(ErrorResponse, {statusCode: 401})
@ResponseSchema(ErrorResponse, {statusCode: 404})
@ResponseSchema(ErrorResponse, {statusCode: 500})
export class SubCategoryController {
    constructor(private subCategoryService: SubCategoryService, private parseHelper: ParseHelper) {
    }

    @Get()
    @UseInterceptor(ClassTransformerInterceptor(SubCategoryResponse))
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(SubCategoryNotFoundError)
    @ResponseSchema(SubCategoryResponse, {isArray: true})
    public find(
        @QueryParams() query: FullQuery
    ): Promise<CListData<SubCategory> | undefined> {
        const queryParse = this.parseHelper.fullQueryParam(query);

        return this.subCategoryService.find(queryParse);
    }

    @Post()
    @UseBefore(CheckRoleFuncMiddleware(UserRoles.admin))
    @OpenAPI({
        description: `\n
                      fields optional: code, note, createdAt`,
    })
    @OnUndefined(SubCategoryNotFoundError)
    @ResponseSchema(SubCategoryResponse)
    public create(
        @Body({required: true}) body: CreateSubCategoryBody
    ): Promise<SubCategory | undefined> {
        const subCategory = new SubCategory();
        _.assign(subCategory, body);

        return this.subCategoryService.create(subCategory);
    }

    @Get('/:id')
    @UseInterceptor(ClassTransformerInterceptor(SubCategoryResponse))
    @OnUndefined(SubCategoryNotFoundError)
    @ResponseSchema(SubCategoryResponse)
    public async findOne(
        @Param('id') id: string,
        @QueryParams() query: BaseQuery
    ): Promise<SubCategory | undefined> {
        const queryParse = this.parseHelper.baseQueryParam(query);

        return await this.subCategoryService.findOne(id, queryParse);
    }

    @Patch('/:id')
    @UseBefore(CheckRoleFuncMiddleware(UserRoles.admin))
    @OnUndefined(SubCategoryNotFoundError)
    @ResponseSchema(SubCategoryResponse)
    public update(
        @Param('id') id: string,
        @Body({required: true}) body: UpdateSubCategoryBody
    ): Promise<SubCategory | undefined> {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);

        return this.subCategoryService.update(id, bodyParse);
    }

    @Delete('/:id')
    @UseBefore(CheckRoleFuncMiddleware(UserRoles.admin))
    @OnUndefined(SubCategoryNotFoundError)
    public delete(@Param('id') id: string): Promise<SubCategory | undefined> {
        return this.subCategoryService.delete(id);
    }
}
