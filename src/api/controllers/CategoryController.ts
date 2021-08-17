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
    QueryParams, UseBefore,
    UseInterceptor,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import _ from 'lodash';
import { CategoryNotFoundError } from '../errors';
import { ClassTransformerInterceptor, ListResponseInterceptor } from '../interceptors';
import { UseCache } from '../middlewares';
import { Category } from '../models';
import { CategoryService, CListData } from '../services';
import { ParseHelper } from '../services/common';
import { BaseQuery, FullQuery, CreateCategoryBody, UpdateCategoryBody } from './requests';
import { ErrorResponse, CategoryResponse } from './responses';
import { CheckRoleFuncMiddleware } from '../middlewares';
import { UserRoles } from '../middlewares/CheckRoleFuncMiddleware';

@Authorized()
@JsonController('/categories')
// @OpenAPI({security: [{basicAuth: []}]})
@ResponseSchema(ErrorResponse, {statusCode: 401})
@ResponseSchema(ErrorResponse, {statusCode: 404})
@ResponseSchema(ErrorResponse, {statusCode: 500})
export class CategoryController {
    constructor(private categoryService: CategoryService, private parseHelper: ParseHelper) {
    }

    @Get()
    @UseInterceptor(ClassTransformerInterceptor(CategoryResponse))
    @UseInterceptor(ListResponseInterceptor)
    @UseCache({ ttl: 1, browser_ttl: 1 })
    @OnUndefined(CategoryNotFoundError)
    @ResponseSchema(CategoryResponse, {isArray: true})
    public find(
        @QueryParams() query: FullQuery
    ): Promise<CListData<Category> | undefined> {
        const queryParse = this.parseHelper.fullQueryParam(query);

        return this.categoryService.find(queryParse);
    }

    @Post()
    @UseBefore(CheckRoleFuncMiddleware(UserRoles.admin))
    @OpenAPI({
        description: `\n
                      fields optional: code, note, createdAt`,
    })
    @OnUndefined(CategoryNotFoundError)
    @ResponseSchema(CategoryResponse)
    public create(
        @Body({required: true}) body: CreateCategoryBody,
        @CurrentUser({required: true}) user: any
    ): Promise<Category | undefined> {
        const category = new Category();
        _.assign(category, body);

        return this.categoryService.create(category);
    }

    @Get('/:id')
    @UseInterceptor(ClassTransformerInterceptor(CategoryResponse))
    @OnUndefined(CategoryNotFoundError)
    @ResponseSchema(CategoryResponse)
    public async findOne(
        @Param('id') id: string,
        @QueryParams() query: BaseQuery
    ): Promise<Category | undefined> {
        const queryParse = this.parseHelper.baseQueryParam(query);

        return await this.categoryService.findOne(id, queryParse);
    }

    @Patch('/:id')
    @UseBefore(CheckRoleFuncMiddleware(UserRoles.admin))
    @OnUndefined(CategoryNotFoundError)
    @ResponseSchema(CategoryResponse)
    public update(
        @Param('id') id: string,
        @Body({required: true}) body: UpdateCategoryBody
    ): Promise<Category | undefined> {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);

        return this.categoryService.update(id, bodyParse);
    }

    @Delete('/:id')
    @UseBefore(CheckRoleFuncMiddleware(UserRoles.admin))
    @OnUndefined(CategoryNotFoundError)
    public delete(@Param('id') id: string): Promise<Category | undefined> {
        return this.categoryService.delete(id);
    }
}
