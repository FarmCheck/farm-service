import _ from 'lodash';
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
    UseInterceptor
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { ProductNotFoundError } from '../errors';
import { ClassTransformerInterceptor, ListResponseInterceptor } from '../interceptors';
import { Product } from '../models';
import { ProductService, CListData } from '../services';
import { BaseQuery, FullQuery, CreateProductBody, UpdateProductBody  } from './requests';
import { ErrorResponse, ProductResponse, ProductDetailResponse } from './responses';
import { ParseHelper } from '../services/common';
import { ProductRepository } from '../repositories';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { AuthHelper } from '../../auth/AuthHelper';
import { UseCache } from '../middlewares';

@Authorized()
@JsonController('/products')
@ResponseSchema(ErrorResponse, {statusCode: 401})
@ResponseSchema(ErrorResponse, {statusCode: 404})
@ResponseSchema(ErrorResponse, {statusCode: 500})
export class ProductController {
    constructor(
        private productService: ProductService,
        private parseHelper: ParseHelper,
        @OrmRepository()
        private productRepository: ProductRepository
    ) {
    }

    @Get()
    @OpenAPI({
        description: `\n
                      example order: {"createdAt": -1}, \n
                      example select: ["id", "name", "code", "productObjectsTotal"], \n
                      example where: {"farmID": "uuid example", "categoryID": "uuid example"} (need farmID to check auth owner farm), \n
                      example relations: ["medias", "productObjects"], \n
                      status: 0: 'activate', 1: 'deactivate', 2: 'pause', \n
                      unit: 0: 'item', 1: 'kilogram', 2: 'others' \n
                      duration: 0: 'day', 1: 'week', 2: 'month', 3: 'year' \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'`,
    })
    @UseCache({ ttl: 1 })
    @UseInterceptor(ClassTransformerInterceptor(ProductResponse))
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(ProductNotFoundError)
    @ResponseSchema(ProductResponse, {isArray: true})
    public find(
        @QueryParams() query: FullQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<CListData<Product> | undefined> {
        const queryParse = this.parseHelper.fullQueryParam(query);
        AuthHelper.authQueryByWhereParam(queryParse.where, user, { inEntity: 'farmID', inUser: 'farmID' });

        return this.productService.find(queryParse);
    }

    @Post()
    @OpenAPI({
        description: `\n
                      fields optional: productObjectsTotal, locationID, medias, barcode, code, unit, description, duration, durationType, isHaveBrand,
                      brandName, brandDescription, taxCode, email, phoneNumber, website, logo, banner, address, latitude, longitude, createdAt, \n
                      updatedAt, deletedAt, status \n
                      unit: 0: 'item', 1: 'kilogram', 2: 'others' \n
                      duration: 0: 'day', 1: 'week', 2: 'month', 3: 'year' \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'`,
    })
    @OnUndefined(ProductNotFoundError)
    @ResponseSchema(ProductResponse)
    public create(
        @Body({required: true}) body: CreateProductBody,
        @CurrentUser({required: true}) user: any
    ): Promise<Product | undefined> {
        AuthHelper.authQuery(body.farmID, 'farmID', user);

        const product = new Product();
        _.assign(product, body);

        return this.productService.create(product, body.medias);
    }

    @Get('/:id')
    @OpenAPI({
        description: `\n
                      example select: ["id", "name", "code", "productObjectsTotal"], \n
                      example relations: ["certificationAbles", "certificationAbles.organization", "certificationAbles.certification", "medias", "location"], \n
                      status: 0: 'activate', 1: 'deactivate', 2: 'pause', \n
                      unit: 0: 'item', 1: 'kilogram', 2: 'others' \n
                      duration: 0: 'day', 1: 'week', 2: 'month', 3: 'year' \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'`,
    })
    @UseInterceptor(ClassTransformerInterceptor(ProductDetailResponse))
    @OnUndefined(ProductNotFoundError)
    @ResponseSchema(ProductDetailResponse)
    public async findOne(
        @Param('id') id: string,
        @QueryParams() query: BaseQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<Product | undefined> {
        await AuthHelper.authQueryNeedFinding(this.productRepository, id, {inEntity: 'farmID', inUser: 'farmID'}, user);
        const queryParse = this.parseHelper.baseQueryParam(query);

        return await this.productService.findOne(id, queryParse);
    }

    @Patch('/:id')
    @OnUndefined(ProductNotFoundError)
    @ResponseSchema(ProductResponse)
    public async update(
        @Param('id') id: string,
        @Body({required: true}) body: UpdateProductBody,
        @CurrentUser({required: true}) user: any
    ): Promise<Product | undefined> {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);

        await AuthHelper.authQueryNeedFinding(this.productRepository, id, {inEntity: 'farmID', inUser: 'farmID'}, user);

        if (bodyParse.farmID) {
            AuthHelper.authQuery(bodyParse.farmID, 'farmID', user);
        }

        return this.productService.update(id, bodyParse);
    }

    @Delete('/:id')
    @OnUndefined(ProductNotFoundError)
    public async delete(
        @Param('id') id: string,
        @CurrentUser({required: true}) user: any
    ): Promise<Product | undefined> {
        await AuthHelper.authQueryNeedFinding(this.productRepository, id, {inEntity: 'farmID', inUser: 'farmID'}, user);

        return this.productService.delete(id);
    }
}
