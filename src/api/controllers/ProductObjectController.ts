import { IsIn,  IsOptional } from 'class-validator';
import _ from 'lodash';
import { Authorized, Body, CurrentUser, Delete, Get, JsonController, OnUndefined, Param, Patch, Post, QueryParams, UseInterceptor } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { ClassTransformOptions, plainToClass } from 'class-transformer';
import { Service } from 'typedi';

import { ProductObjectNotFoundError } from '../errors';
import { ClassTransformerInterceptor, ListResponseInterceptor } from '../interceptors';
import { ProductObject, Section } from '../models';
import { CListData, ProductObjectService } from '../services';
import { BaseQuery, FullQuery, CreateProductObjectBody, UpdateProductObjectBody } from './requests';
import { ErrorResponse, ProductObjectResponse, ProductObjectPortalResponse, ProductObjectDetailResponse, SectionDetailResponse } from './responses';
import { ParseHelper } from '../services/common';
import { AuthHelper } from '../../auth/AuthHelper';
import { AreaRepository, ProcessRepository, ProductObjectRepository, ProductRepository } from '../repositories';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { DiariesPortalResponse } from './responses/PortalResponse';

enum ProductObjectQueryType {
    portal = 0,
    diaries= 1,
}

class ProductObjectDiariesQuery extends BaseQuery {
    @IsOptional()
    @IsIn([
        ProductObjectQueryType.portal,
        ProductObjectQueryType.diaries,
    ])
    public type: ProductObjectQueryType = ProductObjectQueryType.portal;
}

@JsonController('/product-objects')
@Service()
@ResponseSchema(ErrorResponse, {statusCode: 401})
@ResponseSchema(ErrorResponse, {statusCode: 404})
@ResponseSchema(ErrorResponse, {statusCode: 500})
export class ProductObjectController {
    constructor(
        private productObjectService: ProductObjectService,
        private parseHelper: ParseHelper,
        @OrmRepository()
        private productRepository: ProductRepository,
        @OrmRepository()
        private processRepository: ProcessRepository,
        @OrmRepository()
        private areaRepository: AreaRepository,
        @OrmRepository()
        private productObjectRepository: ProductObjectRepository
    ) {
    }

    @Authorized()
    @Get()
    @OpenAPI({
        description: `\n
                      example order: {"createdAt": -1}, \n
                      example select: ["id", "name", "code"], \n
                      example where: { "product": {"farmID": "uuid example", "subCategory": {"categoryID": "uuid example"}}} (need farmID to check auth owner farm) \n
                      example relations: ["medias", "area"], \n
                      status: 0: 'activate', 1: 'deactivate', 2: 'pause', 3: 'draft', \n
                      type: 0: 'field plant', 1: 'farming plant', 2: 'production plant' \n
                      objectType: 0: 'tree', 1: 'bed', 2: 'all', 3: 'farm', 4: 'closed farm', 5: 'others' \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'`,
    })
    @UseInterceptor(ClassTransformerInterceptor(ProductObjectResponse))
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(ProductObjectNotFoundError)
    @ResponseSchema(ProductObjectResponse, {isArray: true})
    public find(
        @QueryParams() query: FullQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<CListData<ProductObject> | undefined> {
        const queryParse = this.parseHelper.fullQueryParam(query);
        AuthHelper.authQueryByWhereParam(queryParse.where, user, { inEntity: 'product.farmID', inUser: 'farmID' });

        return this.productObjectService.find(queryParse);
    }

    @Authorized()
    @Post()
    @OpenAPI({
        description: `\n
                      fields optional: medias, code, type, objectType, description, createdAt, updatedAt, deletedAt, status \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'\n`,
    })
    @OnUndefined(ProductObjectNotFoundError)
    @ResponseSchema(ProductObjectResponse)
    public async create(
        @Body({required: true}) body: CreateProductObjectBody,
        @CurrentUser({required: true}) user: any
    ): Promise<ProductObject | undefined> {
        await Promise.all([
            AuthHelper.authQueryNeedFinding(this.productRepository, body.productID, {inEntity: 'farmID', inUser: 'farmID'}, user),
            AuthHelper.authQueryNeedFinding(this.processRepository, body.processID, {inEntity: 'farmID', inUser: 'farmID'}, user),
            AuthHelper.authQueryNeedFinding(this.areaRepository, body.areaID, {inEntity: 'farmID', inUser: 'farmID'}, user),
        ]);

        const productObject = new ProductObject();
        _.assign(productObject, body);

        return this.productObjectService.create(productObject, body.medias);
    }

    @Authorized()
    @Get('/:id')
    @OpenAPI({
        description: `\n
                      example select: ["id", "name", "code"], \n
                      example relations: ["area", "process", "product", "sections", "medias"],\n
                      example relations for farm:
                                         ["product", "product.farm", "product.farm.location"], \n
                      example relations for product certification:
                                         ["product", "product.certificationAbles", "product.certificationAbles.organization",
                                         "product.certificationAbles.certification"], \n
                      status: 0: 'activate', 1: 'deactivate', 2: 'pause', \n
                      type: 0: 'field plant', 1: 'farming plant', 2: 'production plant' \n
                      objectType: 0: 'tree', 1: 'bed', 2: 'all', 3: 'farm', 4: 'closed farm', 5: 'others' \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'\n`,
    })
    @OnUndefined(ProductObjectNotFoundError)
    @ResponseSchema(ProductObjectDetailResponse, {description: 'default'})
    public async findOne(
        @Param('id') id: string,
        @QueryParams() query: BaseQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<ProductObjectDetailResponse | undefined> {
        const queryParse = this.parseHelper.baseQueryParam(query);
        const transformOptions: ClassTransformOptions = {
            strategy: 'excludeAll',
            exposeUnsetFields: false,
        };

        await AuthHelper.authQueryNeedFinding(this.productObjectRepository, id, {inEntity: 'area.farmID', inUser: 'farmID'}, user, ['area']);
        const product = await this.productObjectService
            .findOne(id, queryParse);
        return plainToClass(ProductObjectDetailResponse, product, transformOptions);
    }

    @Get('/:id/portal')
    @OpenAPI({
        description: `\n
                      example select: ["id", "name", "code"], \n
                      example relations: ["area", "process", "product", "sections", "medias"],\n
                      example relations for farm:
                                         ["product", "product.farm", "product.farm.location"], \n
                      example relations for product certification:
                                         ["product", "product.certificationAbles", "product.certificationAbles.organization",
                                         "product.certificationAbles.certification"], \n
                      example query type: 0 - 'info for portal', 1 - 'steps and diaries for portal', \n
                      status: 0: 'activate', 1: 'deactivate', 2: 'pause', \n
                      type: 0: 'field plant', 1: 'farming plant', 2: 'production plant' \n
                      objectType: 0: 'tree', 1: 'bed', 2: 'all', 3: 'farm', 4: 'closed farm', 5: 'others' \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'\n`,
    })
    @OnUndefined(ProductObjectNotFoundError)
    @ResponseSchema(ProductObjectPortalResponse, {description: 'portal'})
    @ResponseSchema(DiariesPortalResponse, {description: 'diaries portal'})
    public async findOneForPortal(
        @Param('id') id: string,
        @QueryParams() query: ProductObjectDiariesQuery
    ): Promise<ProductObjectPortalResponse | DiariesPortalResponse | undefined> {
        const queryParse = this.parseHelper.baseQueryParam(query);
        const { type } = queryParse;
        const transformOptions: ClassTransformOptions = {
            strategy: 'excludeAll',
            exposeUnsetFields: false,
        };

        if (type === ProductObjectQueryType.diaries) {
            const response = await this.productObjectService
                .findStepsWithDiaries(id);
            return plainToClass(DiariesPortalResponse, response, transformOptions);
        } else {
            const product = await this.productObjectService
                .findOne(id, queryParse);
            return plainToClass(ProductObjectPortalResponse, product, transformOptions);
        }
    }

    @Authorized()
    @Get('/:id/sections')
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(ProductObjectNotFoundError)
    @ResponseSchema(SectionDetailResponse, {isArray: true})
    public async findSections(
        @Param('id') id: string,
        @QueryParams() fullQuery: FullQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<CListData<Section> | undefined> {
        await AuthHelper.authQueryNeedFinding(this.productObjectRepository, id, {inEntity: 'area.farmID', inUser: 'farmID'}, user, ['area']);
        return this.productObjectService.getSections(id, fullQuery);
    }

    // @Get('/:id/diaries')
    // @UseCache({ ttl: 10 })
    // @ClassTransformerInterceptor(DiariesPortalResponse)
    // @OnUndefined(ProductObjectNotFoundError)
    // @ResponseSchema(DiariesPortalResponse)
    // public async findDiary(
    //     @Param('id') id: string
    // ): Promise<DiariesPortalResponse> {
    //     return await this.productObjectService.findStepsWithDiaries(id);
    // }

    @Authorized()
    @Patch('/:id')
    @OnUndefined(ProductObjectNotFoundError)
    @ResponseSchema(ProductObjectResponse)
    public async update(
        @Param('id') id: string,
        @Body({required: true}) body: UpdateProductObjectBody,
        @CurrentUser({required: true}) user: any
    ): Promise<ProductObject | undefined> {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);

        const awaiters = [];
        awaiters.push(AuthHelper.authQueryNeedFinding(this.productObjectRepository, id, {inEntity: 'area.farmID', inUser: 'farmID'}, user, ['area']));

        if (bodyParse.productID) {
            awaiters.push(AuthHelper.authQueryNeedFinding(this.productRepository, bodyParse.productID, {inEntity: 'farmID', inUser: 'farmID'}, user));
        }

        if (bodyParse.processID) {
            awaiters.push(AuthHelper.authQueryNeedFinding(this.processRepository, bodyParse.processID, {inEntity: 'farmID', inUser: 'farmID'}, user));
        }

        if (bodyParse.areaID) {
            awaiters.push(AuthHelper.authQueryNeedFinding(this.areaRepository, bodyParse.areaID, {inEntity: 'farmID', inUser: 'farmID'}, user));
        }

        await Promise.all(awaiters);

        return this.productObjectService.update(id, bodyParse);
    }

    @Authorized()
    @Delete('/:id')
    @OnUndefined(ProductObjectNotFoundError)
    public async delete(
        @Param('id') id: string,
        @CurrentUser({required: true}) user: any
    ): Promise<ProductObject | undefined> {
        await AuthHelper.authQueryNeedFinding(this.productObjectRepository, id, {inEntity: 'area.farmID', inUser: 'farmID'}, user, ['area']);

        return this.productObjectService.delete(id);
    }
}
