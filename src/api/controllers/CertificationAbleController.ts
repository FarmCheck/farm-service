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
import { CertificationAble } from '../models';
import { CertificationAbleService, CListData } from '../services';
import { CertificationAbleNotFoundError } from '../errors';
import { ClassTransformerInterceptor, ListResponseInterceptor } from '../interceptors';
import { ErrorResponse, CertificationAbleResponse } from './responses';
import { BaseQuery, FullQuery, CreateCertificationAbleBody, UpdateCertificationAbleBody } from './requests';
import { ParseHelper } from '../services/common';
import { AuthHelper } from '../../auth/AuthHelper';
import { CertificationAbleRepository, FarmRepository, ProductRepository } from '../repositories';
import { OrmRepository } from 'typeorm-typedi-extensions';

@Authorized()
@JsonController('/certification-ables')
@ResponseSchema(ErrorResponse, {statusCode: 401})
@ResponseSchema(ErrorResponse, {statusCode: 404})
@ResponseSchema(ErrorResponse, {statusCode: 500})
export class CertificationAbleController {
    constructor(
        private certificationAbleService: CertificationAbleService,
        private parseHelper: ParseHelper,
        @OrmRepository()
        private farmRepository: FarmRepository,
        @OrmRepository()
        private productRepository: ProductRepository,
        @OrmRepository()
        private certificationAbleRepository: CertificationAbleRepository
    ) {
    }

    @Get()
    @OpenAPI({
        description: `\n
                      example order: {"createdAt": -1}, \n
                      example select: ["id", "targetID"], \n
                      example relations: ["certification", "organization"]`,
    })
    @UseInterceptor(ClassTransformerInterceptor(CertificationAbleResponse))
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(CertificationAbleNotFoundError)
    @ResponseSchema(CertificationAbleResponse, {isArray: true})
    public async find(
        @QueryParams() query: FullQuery,
        @QueryParam('targetType', {required: true}) targetType: string,
        @CurrentUser({required: true}) user: any
    ): Promise<CListData<CertificationAble> | undefined> {
        const queryParse = this.parseHelper.fullQueryParam(query);
        await this.authQueryWhereParam(queryParse.where, user, targetType);

        return this.certificationAbleService.find(queryParse);
    }

    @Post()
    @OpenAPI({
        description: `\n
                      fields optional: organizationID, targetTypeID, description, createdAt, effectiveAt, urls \n
                      target type: product || farm \n
                      effectiveAt: default 1 month later`,
    })
    @OnUndefined(CertificationAbleNotFoundError)
    @ResponseSchema(CertificationAbleResponse)
    public async create(
        @Body({required: true}) body: CreateCertificationAbleBody,
        @QueryParam('targetType', {required: true}) targetType: string,
        @CurrentUser({required: true}) user: any
    ): Promise<CertificationAble | undefined> {
        await this.authQueryWhereParam({targetID: body.targetID}, user, targetType);
        const certificationAble = new CertificationAble();
        _.assign(certificationAble, body);

        return this.certificationAbleService.create(certificationAble, body.targetType);
    }

    @Get('/:id')
    @OpenAPI({
        description: `\n
                      example relations: ["certification", "organization"]`,
    })
    @UseInterceptor(ClassTransformerInterceptor(CertificationAbleResponse))
    @OnUndefined(CertificationAbleNotFoundError)
    @ResponseSchema(CertificationAbleResponse)
    public async findOne(
        @Param('id') id: string,
        @QueryParams() query: BaseQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<CertificationAble | undefined> {
        await this.authEntityByID(id, user);
        const queryParse = this.parseHelper.baseQueryParam(query);

        return await this.certificationAbleService.findOne(
            id,
            queryParse
        );
    }

    @Patch('/:id')
    @OnUndefined(CertificationAbleNotFoundError)
    @ResponseSchema(CertificationAbleResponse)
    public async update(
        @Param('id') id: string,
        @Body({required: true}) body: UpdateCertificationAbleBody,
        @QueryParam('targetType', {required: true}) targetType: string,
        @CurrentUser({required: true}) user: any
    ): Promise<CertificationAble | undefined> {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);

        const awaiters = [];
        awaiters.push(this.authEntityByID(id, user));

        if (bodyParse.targetID) {
            awaiters.push(this.authQueryWhereParam({targetID: bodyParse.targetID}, user, targetType));
        }

        await Promise.all(awaiters);

        return this.certificationAbleService.update(id, bodyParse);
    }

    @Delete('/:id')
    @OnUndefined(CertificationAbleNotFoundError)
    public async delete(
        @Param('id') id: string,
        @CurrentUser({required: true}) user: any
    ): Promise<CertificationAble | undefined> {
        await this.authEntityByID(id, user);
        return this.certificationAbleService.delete(id);
    }

    private async authEntityByID(id: string, user: any): Promise<any> {
        const certAble = await this.certificationAbleRepository.findOne(id, { relations: ['targetType'] });

        if (!certAble) {
            throw new HttpError(403, 'Forbidden');
        }

        let repository = undefined;
        let compareField = { inEntity: '', inUser: ''};

        switch (certAble.targetType.name) {
            case 'farm':
                repository = this.farmRepository;
                compareField = {inEntity: 'userID', inUser: 'sub'};
                break;
            case 'product':
                repository = this.productRepository;
                compareField = { inEntity: 'farmID', inUser: 'farmID'};
                break;
            default:
                repository = undefined;
        }

        if (!repository) {
            throw new HttpError(500, 'target type in DB is invalid');
        }

        await AuthHelper.authQueryNeedFinding(repository, certAble.targetID, compareField, user);
    }

    private async authQueryWhereParam(where: any, user: any, targetType: string): Promise<any> {
        let repository = undefined;
        let compareField = {idField: 'targetID', inEntity: '', inUser: ''};

        switch (targetType) {
            case 'farm':
                repository = this.farmRepository;
                compareField = {idField: 'targetID', inEntity: 'userID', inUser: 'sub'};
                break;
            case 'product':
                repository = this.productRepository;
                compareField = {idField: 'targetID', inEntity: 'farmID', inUser: 'farmID'};
                break;
            default:
                repository = undefined;
        }

        if (!repository) {
            throw new HttpError(400, 'target type is invalid');
        }

        await AuthHelper.authQueryByWhereParamNeedFinding(repository, where, compareField, user);
    }
}
