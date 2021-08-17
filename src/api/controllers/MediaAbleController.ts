import {
    Authorized,
    Body, CurrentUser,
    Delete,
    Get, HttpError,
    JsonController,
    OnUndefined,
    Param,
    Patch,
    Post,
    QueryParam, QueryParams,
    UseInterceptor,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import _ from 'lodash';
import { MediaAbleService, CListData } from '../services';
import { MediaAble } from '../models';
import { MediaAbleNotFoundError } from '../errors';
import { ClassTransformerInterceptor, ListResponseInterceptor } from '../interceptors';
import { ErrorResponse, MediaAbleResponse } from './responses';
import { BaseQuery, FullQuery, CreateMediaAbleBody, UpdateMediaAbleBody } from './requests';
import { ParseHelper } from '../services/common';
import { AuthHelper } from '../../auth/AuthHelper';
import { OrmRepository } from 'typeorm-typedi-extensions';
import {
    AreaRepository,
    FarmRepository,
    MediaAbleRepository,
    ProductObjectRepository,
    ProductRepository
} from '../repositories';

@Authorized()
@JsonController('/media-ables')
@ResponseSchema(ErrorResponse, {statusCode: 401})
@ResponseSchema(ErrorResponse, {statusCode: 404})
@ResponseSchema(ErrorResponse, {statusCode: 500})
export class MediaAbleController {
    constructor(
        private mediaAbleService: MediaAbleService,
        private parseHelper: ParseHelper,
        @OrmRepository()
        private farmRepository: FarmRepository,
        @OrmRepository()
        private productRepository: ProductRepository,
        @OrmRepository()
        private areaRepository: AreaRepository,
        @OrmRepository()
        private productObjectRepository: ProductObjectRepository,
        @OrmRepository()
        private mediaAbleRepository: MediaAbleRepository
    ) {
    }

    @Get()
    @OpenAPI({
        description: `\n
                      example order: {"createdAt": -1}, \n
                      example select: ["id", "targetID"]`,
    })
    @UseInterceptor(ClassTransformerInterceptor(MediaAbleResponse))
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(MediaAbleNotFoundError)
    @ResponseSchema(MediaAbleResponse, {isArray: true})
    public async find(
        @QueryParam('targetType', {required: true}) targetType: string,
        @QueryParams() query: FullQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<CListData<MediaAble> | undefined> {
        const queryParse = this.parseHelper.fullQueryParam(query);
        await this.authQueryWhereParam(queryParse.where, user, targetType);

        return this.mediaAbleService.find(queryParse);
    }

    @Post()
    @OnUndefined(MediaAbleNotFoundError)
    @ResponseSchema(MediaAbleResponse)
    public async create(
        @Body({required: true}) body: CreateMediaAbleBody,
        @CurrentUser({required: true}) user: any
    ): Promise<MediaAble | undefined> {
        await this.authQueryWhereParam({targetID: body.targetID}, user, body.targetType);
        const mediaAble = new MediaAble();
        _.assign(mediaAble, body);

        return this.mediaAbleService.create(mediaAble);
    }

    @Get('/:id')
    @UseInterceptor(ClassTransformerInterceptor(MediaAbleResponse))
    @OnUndefined(MediaAbleNotFoundError)
    @ResponseSchema(MediaAbleResponse)
    public async findOne(
        @Param('id') id: string,
        @QueryParams() query: BaseQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<MediaAble | undefined> {
        await this.authEntityByID(id, user);
        const queryParse = this.parseHelper.baseQueryParam(query);

        return await this.mediaAbleService.findOne(id, queryParse);
    }

    @Patch('/:id')
    @OnUndefined(MediaAbleNotFoundError)
    @ResponseSchema(MediaAbleResponse)
    public async update(
        @Param('id') id: string,
        @Body({required: true}) body: UpdateMediaAbleBody,
        @QueryParam('targetType', {required: true}) targetType: string,
        @CurrentUser({required: true}) user: any
    ): Promise<MediaAble | undefined> {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);

        const awaiters = [];
        awaiters.push(this.authEntityByID(id, user));

        if (bodyParse.targetID) {
            awaiters.push(this.authQueryWhereParam({targetID: bodyParse.targetID}, user, targetType));
        }

        await Promise.all(awaiters);

        return this.mediaAbleService.update(id, bodyParse);
    }

    @Delete('/:id')
    @OnUndefined(MediaAbleNotFoundError)
    public async delete(
        @Param('id') id: string,
        @CurrentUser({required: true}) user: any
    ): Promise<MediaAble | undefined> {
        await this.authEntityByID(id, user);
        return this.mediaAbleService.delete(id);
    }

    private async authEntityByID(id: string, user: any): Promise<any> {
        const certAble = await this.mediaAbleRepository.findOne(id, { relations: ['targetType'] });

        if (!certAble) {
            throw new HttpError(403, 'Forbidden');
        }

        let repository = undefined;
        let compareField = { inEntity: '', inUser: ''};
        let relations = [];

        switch (certAble.targetType.name) {
            case 'farm':
                repository = this.farmRepository;
                compareField = {inEntity: 'userID', inUser: 'sub'};
                break;
            case 'product':
                repository = this.productRepository;
                compareField = {inEntity: 'farmID', inUser: 'farmID'};
                break;
            case 'area':
                repository = this.areaRepository;
                compareField = {inEntity: 'farmID', inUser: 'farmID'};
                break;
            case 'product_object':
                repository = this.productObjectRepository;
                compareField = {inEntity: 'process.farmID', inUser: 'farmID'};
                relations = ['process'];
                break;
            default:
                repository = undefined;
        }

        if (!repository) {
            throw new HttpError(500, 'target type in DB is invalid');
        }

        await AuthHelper.authQueryNeedFinding(repository, certAble.targetID, compareField, user, relations);
    }

    private async authQueryWhereParam(where: any, user: any, targetType: string): Promise<any> {
        let repository = undefined;
        let compareField = {idField: 'targetID', inEntity: '', inUser: ''};
        let relations = [];

        switch (targetType) {
            case 'farm':
                repository = this.farmRepository;
                compareField = {idField: 'targetID', inEntity: 'userID', inUser: 'sub'};
                break;
            case 'product':
                repository = this.productRepository;
                compareField = {idField: 'targetID', inEntity: 'farmID', inUser: 'farmID'};
                break;
            case 'area':
                repository = this.areaRepository;
                compareField = {idField: 'targetID', inEntity: 'farmID', inUser: 'farmID'};
                break;
            case 'product_object':
                repository = this.productObjectRepository;
                compareField = {idField: 'targetID', inEntity: 'process.farmID', inUser: 'farmID'};
                relations = ['process'];
                break;
            default:
                repository = undefined;
        }

        if (!repository) {
            throw new HttpError(400, 'target type is invalid');
        }

        await AuthHelper.authQueryByWhereParamNeedFinding(repository, where, compareField, user, relations);
    }
}
