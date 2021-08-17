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
    QueryParam, QueryParams, UseBefore,
    UseInterceptor,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import _ from 'lodash';
import { MediaService, CListData } from '../services';
import { Media } from '../models';
import { MediaNotFoundError } from '../errors';
import { ClassTransformerInterceptor, ListResponseInterceptor } from '../interceptors';
import { ErrorResponse, MediaResponse } from './responses';
import { BaseQuery, FullQuery, CreateMediaBody, UpdateMediaBody } from './requests';
import { ParseHelper } from '../services/common';
import { CheckRoleFuncMiddleware } from '../middlewares';
import { UserRoles } from '../middlewares/CheckRoleFuncMiddleware';
import { AuthHelper } from '../../auth/AuthHelper';
import { OrmRepository } from 'typeorm-typedi-extensions';
import {
    AreaRepository,
    FarmRepository, MediaAbleRepository,
    ProductObjectRepository,
    ProductRepository, TargetTypeRepository
} from '../repositories';

@Authorized()
@JsonController('/medias')
@ResponseSchema(ErrorResponse, {statusCode: 401})
@ResponseSchema(ErrorResponse, {statusCode: 404})
@ResponseSchema(ErrorResponse, {statusCode: 500})
export class MediaController {
    constructor(
        private areaImageService: MediaService,
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
        private mediaAbleRepository: MediaAbleRepository,
        @OrmRepository()
        private targetTypeRepository: TargetTypeRepository
        ) {
    }

    @Get()
    @UseBefore(CheckRoleFuncMiddleware(UserRoles.admin))
    @UseInterceptor(ClassTransformerInterceptor(MediaResponse))
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(MediaNotFoundError)
    @ResponseSchema(MediaResponse, {isArray: true})
    public find(
        @QueryParams() query: FullQuery
    ): Promise<CListData<Media> | undefined> {
        const queryParse = this.parseHelper.fullQueryParam(query);

        return this.areaImageService.find(queryParse);
    }

    @Post()
    @OpenAPI({
        description: `\n
                      fields optional: createdAt`,
    })
    @OnUndefined(MediaNotFoundError)
    @ResponseSchema(MediaResponse)
    public async create(
        @Body({required: true}) body: CreateMediaBody,
        @CurrentUser({required: true}) user: any
    ): Promise<Media | undefined> {
        await this.authQueryWhereParam({targetID: body.targetID}, user, body.targetType);
        const areaImage = new Media();
        _.assign(areaImage, body);

        return this.areaImageService.create(areaImage, body.targetID, body.targetType);
    }

    @Get('/:id')
    @UseInterceptor(ClassTransformerInterceptor(MediaResponse))
    @OnUndefined(MediaNotFoundError)
    @ResponseSchema(MediaResponse)
    public async findOne(
        @Param('id') id: string,
        @QueryParams() query: BaseQuery,
        @QueryParam('targetType', {required: true}) targetType: string,
        @QueryParam('targetID', {required: true}) targetID: string,
        @CurrentUser({required: true}) user: any
    ): Promise<Media | undefined> {
        await this.authEntityByID(id, user, targetID, targetType);
        const queryParse = this.parseHelper.baseQueryParam(query);

        return await this.areaImageService.findOne(id, queryParse);
    }

    @Patch('/:id')
    @OnUndefined(MediaNotFoundError)
    @ResponseSchema(MediaResponse)
    public async update(
        @Param('id') id: string,
        @Body({required: true}) body: UpdateMediaBody,
        @QueryParam('targetType', {required: true}) targetType: string,
        @QueryParam('targetID', {required: true}) targetID: string,
        @CurrentUser({required: true}) user: any
    ): Promise<Media | undefined> {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);

        await this.authEntityByID(id, user, targetID, targetType);

        return this.areaImageService.update(id, bodyParse);
    }

    @Delete('/:id')
    @OnUndefined(MediaNotFoundError)
    public async delete(
        @Param('id') id: string,
        @QueryParam('targetType', {required: true}) targetType: string,
        @QueryParam('targetID', {required: true}) targetID: string,
        @CurrentUser({required: true}) user: any
    ): Promise<Media | undefined> {
        await this.authEntityByID(id, user, targetID, targetType);
        return this.areaImageService.delete(id);
    }

    private async authEntityByID(id: string, user: any, targetID: string, targetType: string): Promise<any> {
        const targetTypeEntity = await this.targetTypeRepository.findOne({ name: targetType});

        if (!targetType) {
            throw new HttpError(400, 'targetType is invalid');
        }

        const certAble = await this.mediaAbleRepository.findOne({
            where: {
                targetID,
                mediaID: id,
                targetTypeID: targetTypeEntity.id,
            },
        });

        if (!certAble) {
            throw new HttpError(403, 'Forbidden');
        }

        let repository = undefined;
        let compareField = { inEntity: '', inUser: ''};
        let relations = [];

        switch (targetType) {
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
            throw new HttpError(400, 'targetType is invalid');
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
