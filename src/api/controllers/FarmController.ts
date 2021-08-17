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
    QueryParams, Req,
    UseInterceptor,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import _ from 'lodash';
import { FarmService, CListData } from '../services';
import { Area, Product, Farm, ProductObject, Process } from '../models';
import { FarmNotFoundError } from '../errors';
import { ClassTransformerInterceptor, ListResponseInterceptor } from '../interceptors';
import { ErrorResponse, AreaResponse, FarmResponse, FarmDetailResponse, FarmDashBoardResponse, ProcessResponse, ProductResponse, ProductObjectResponse } from './responses';
import { BaseQuery, FullQuery, CreateFarmBody, UpdateFarmBody } from './requests';
import { ParseHelper } from '../services/common';
import { Request } from 'express';
import { AuthHelper } from '../../auth/AuthHelper';
import { FarmRepository } from '../repositories';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { IsIn, IsOptional } from 'class-validator';
import { ClassTransformOptions, plainToClass } from 'class-transformer';

enum FarmQueryType {
    default = 0,
    dashboard= 1,
}

class FarmQuery extends BaseQuery {
    @IsOptional()
    @IsIn([
        FarmQueryType.default,
        FarmQueryType.dashboard,
    ])
    public type: FarmQueryType = FarmQueryType.default;
}

@Authorized()
@JsonController('/farms')
@ResponseSchema(ErrorResponse, {statusCode: 401})
@ResponseSchema(ErrorResponse, {statusCode: 404})
@ResponseSchema(ErrorResponse, {statusCode: 500})
export class FarmController {
    constructor(
        private farmService: FarmService,
        private parseHelper: ParseHelper,
        @OrmRepository()
        private farmRepository: FarmRepository
    ) {
    }

    @Get()
    @OpenAPI({
        description: `\n
                      example order: {"createdAt": -1}, \n
                      example select: ["id", "name", "code", "productsTotal"], \n
                      example where: {"userID": "uuid example"} (need userID to check auth owner farm) \n
                      example relations: ["medias", "location"], \n
                      status: 0: 'activate', 1: 'deactivate', 2: 'pause', 3: 'draft' \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'`,
    })
    @UseInterceptor(ClassTransformerInterceptor(FarmResponse))
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(FarmNotFoundError)
    @ResponseSchema(FarmResponse, {isArray: true})
    public find(
        @QueryParams() query: FullQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<CListData<Farm> | undefined> {
        const queryParse = this.parseHelper.fullQueryParam(query);
        AuthHelper.authQueryByWhereParam(queryParse.where, user, {inEntity: 'userID', inUser: 'sub'});

        return this.farmService.find(queryParse);
    }

    @Post()
    @OpenAPI({
        description: `\n
                      fields optional: productsTotal, locationID, medias, code, description, isVerifiedPhoneNumber, isVerifiedEmail, website,
                      logo, banner, address, latitude, longitude, status, createdAt, updatedAt, deletedAt \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'`,
    })
    @OnUndefined(FarmNotFoundError)
    @ResponseSchema(FarmResponse)
    public create(
        @Body({required: true}) body: CreateFarmBody,
        @Req() req: Request,
        @CurrentUser({required: true}) user: any
    ): Promise<Farm | undefined> {
        AuthHelper.authQuery(body.userID, 'sub', user);

        const farm = new Farm();
        _.assign(farm, body);
        const token = `${req.headers['token-id']}`;

        return this.farmService.create(farm, body.medias, token);
    }

    @Get('/:id')
    @OpenAPI({
        description: `\n
                      example select: ["id", "name", "code", "productsTotal"], \n
                      example relations: ["certificationAbles", "certificationAbles.organization", "certificationAbles.certification", "medias", "location"], \n
                      status: 0: 'activate', 1: 'deactivate', 2: 'pause', 3: 'draft' \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'`,
    })
    @OnUndefined(FarmNotFoundError)
    @ResponseSchema(FarmDetailResponse, {description: 'default'})
    @ResponseSchema(FarmDashBoardResponse, {description: 'dashboard'})
    public async findOne(
        @Param('id') id: string,
        @QueryParams() query: FarmQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<FarmDetailResponse | FarmDashBoardResponse | undefined> {
        const queryParse = this.parseHelper.baseQueryParam(query);
        const { type } = queryParse;
        const transformOptions: ClassTransformOptions = {
            strategy: 'excludeAll',
            exposeUnsetFields: false,
        };

        await AuthHelper.authQueryNeedFinding(this.farmRepository, id, {inEntity: 'userID', inUser: 'sub'}, user);

        if (type === FarmQueryType.dashboard) {
            const response = await this.farmService.findOneDashboard(id, queryParse);
            return plainToClass(FarmDashBoardResponse, response, transformOptions);
        } else {
            const farm = await this.farmService.findOne(id, queryParse);
            return plainToClass(FarmDetailResponse, farm, transformOptions);
        }
    }

    @Get('/:id/products')
    @UseInterceptor(ClassTransformerInterceptor(ProductResponse))
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(FarmNotFoundError)
    @ResponseSchema(ProductResponse, { isArray: true})
    public async findProducts(
        @Param('id') id: string,
        @QueryParams() query: FullQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<CListData<Product> | undefined> {
        await AuthHelper.authQueryNeedFinding(this.farmRepository, id, {inEntity: 'userID', inUser: 'sub'}, user);
        const queryParse = this.parseHelper.baseQueryParam(query);

        return await this.farmService.getProducts(id, queryParse);
    }

    @Get('/:id/areas')
    @UseInterceptor(ClassTransformerInterceptor(AreaResponse))
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(FarmNotFoundError)
    @ResponseSchema(AreaResponse, { isArray: true})
    public async findAreas(
        @Param('id') id: string,
        @QueryParams() query: FullQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<CListData<Area> | undefined> {
        await AuthHelper.authQueryNeedFinding(this.farmRepository, id, {inEntity: 'userID', inUser: 'sub'}, user);
        const queryParse = this.parseHelper.baseQueryParam(query);

        return this.farmService.getAreas(id, queryParse);
    }

    @Get('/:id/product-objects')
    @UseInterceptor(ClassTransformerInterceptor(ProductObjectResponse))
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(FarmNotFoundError)
    @ResponseSchema(ProductObjectResponse, { isArray: true})
    public async findProductObjects(
        @Param('id') id: string,
        @QueryParams() query: FullQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<CListData<ProductObject> | undefined> {
        await AuthHelper.authQueryNeedFinding(this.farmRepository, id, {inEntity: 'userID', inUser: 'sub'}, user);
        const queryParse = this.parseHelper.baseQueryParam(query);

        return this.farmService.getProductObjects(id, queryParse);
    }

    @Get('/:id/processes')
    @UseInterceptor(ClassTransformerInterceptor(ProcessResponse))
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(FarmNotFoundError)
    @ResponseSchema(ProcessResponse, { isArray: true})
    public async findProcesses(
        @Param('id') id: string,
        @QueryParams() query: FullQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<CListData<Process> | undefined> {
        await AuthHelper.authQueryNeedFinding(this.farmRepository, id, {inEntity: 'userID', inUser: 'sub'}, user);
        const queryParse = this.parseHelper.baseQueryParam(query);

        return this.farmService.getProcesses(id, queryParse);
    }

    @Patch('/:id')
    @OnUndefined(FarmNotFoundError)
    @ResponseSchema(FarmResponse)
    public async update(
        @Param('id') id: string,
        @Body({required: true}) body: UpdateFarmBody,
        @CurrentUser({required: true}) user: any
    ): Promise<Farm | undefined> {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);

        await AuthHelper.authQueryNeedFinding(this.farmRepository, id, {inEntity: 'userID', inUser: 'sub'}, user);

        if (bodyParse.userID) {
            AuthHelper.authQuery(bodyParse.userID, 'sub', user);
        }

        return this.farmService.update(id, bodyParse);
    }

    @Delete('/:id')
    @OnUndefined(FarmNotFoundError)
    public async delete(
        @Param('id') id: string,
        @CurrentUser({required: true}) user: any
    ): Promise<Farm | undefined> {
        await AuthHelper.authQueryNeedFinding(this.farmRepository, id, {inEntity: 'userID', inUser: 'sub'}, user);

        return this.farmService.delete(id);
    }
}
