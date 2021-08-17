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
import { ProcessService, CListData } from '../services';
import { Process } from '../models';
import { ProcessNotFoundError } from '../errors';
import { ClassTransformerInterceptor, ListResponseInterceptor } from '../interceptors';
import { ErrorResponse, ProcessResponse, ProcessDetailResponse } from './responses';
import { BaseQuery, FullQuery, CreateProcessBody, UpdateProcessBody } from './requests';
import { ParseHelper } from '../services/common';
import { ProcessRepository } from '../repositories';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { AuthHelper } from '../../auth/AuthHelper';

@Authorized()
@JsonController('/processes')
@ResponseSchema(ErrorResponse, {statusCode: 401})
@ResponseSchema(ErrorResponse, {statusCode: 404})
@ResponseSchema(ErrorResponse, {statusCode: 500})
export class ProcessController {
    constructor(
        private processService: ProcessService,
        private parseHelper: ParseHelper,
        @OrmRepository()
        private processRepository: ProcessRepository
    ) {}

    @Get()
    @OpenAPI({
        description: `\n
                      example order: {"createdAt": -1}, \n
                      example select: ["id", "name", "code", "productObjectsTotal"], \n
                      example where: {"farmID": "uuid example"} (need farmID to check auth owner farm) \n
                      example relations: ["steps", "steps.stepProperties", "productObjects"], \n
                      status: 0: 'activate', 1: 'deactivate'`,
    })
    @UseInterceptor(ClassTransformerInterceptor(ProcessResponse))
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(ProcessNotFoundError)
    @ResponseSchema(ProcessResponse, { isArray: true })
    public async find(
        @QueryParams() query: FullQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<CListData<Process> | undefined> {
        const queryParse = this.parseHelper.fullQueryParam(query);
        AuthHelper.authQueryByWhereParam(queryParse.where, user, { inEntity: 'farmID', inUser: 'farmID' });

        return this.processService.find(queryParse);
    }

    @Post()
    @OpenAPI({
        description: `\n
                      fields optional: productObjectsTotal, code, quantity, isHaveStep, createdAt, updatedAt, deletedAt, status`,
    })
    @OnUndefined(ProcessNotFoundError)
    @ResponseSchema(ProcessResponse)
    public create(
        @Body({ required: true }) body: CreateProcessBody,
        @CurrentUser({required: true}) user: any
    ): Promise<Process | undefined> {
        AuthHelper.authQuery(body.farmID, 'farmID', user);
        const process = new Process();
        _.assign(process, body);

        return this.processService.create(process);
    }

    @Get('/:id')
    @OpenAPI({
        description: `\n
                      example select: ["id", "name", "code", "productObjectsTotal"], \n
                      example relations: ["steps", "steps.stepProperties"], \n
                      status: 0: 'activate', 1: 'deactivate'`,
    })
    @UseInterceptor(ClassTransformerInterceptor(ProcessDetailResponse))
    @OnUndefined(ProcessNotFoundError)
    @ResponseSchema(ProcessDetailResponse)
    public async findOne(
        @Param('id') id: string,
        @QueryParams() query: BaseQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<Process | undefined> {
        await AuthHelper.authQueryNeedFinding(this.processRepository, id, {inEntity: 'farmID', inUser: 'farmID'}, user);
        const queryParse = this.parseHelper.baseQueryParam(query);

        return await this.processService.findOne(id, queryParse);
    }

    @Patch('/:id')
    @OnUndefined(ProcessNotFoundError)
    @ResponseSchema(ProcessResponse)
    public async update(
        @Param('id') id: string,
        @Body({ required: true }) body: UpdateProcessBody,
        @CurrentUser({required: true}) user: any
    ): Promise<Process | undefined> {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);

        await AuthHelper.authQueryNeedFinding(this.processRepository, id, {inEntity: 'farmID', inUser: 'farmID'}, user);

        if (bodyParse.farmID) {
            AuthHelper.authQuery(bodyParse.farmID, 'farmID', user);
        }

        return this.processService.update(id, bodyParse);
    }

    @Delete('/:id')
    @OnUndefined(ProcessNotFoundError)
    public async delete(
        @Param('id') id: string,
        @CurrentUser({required: true}) user: any
    ): Promise<Process | undefined> {
        await AuthHelper.authQueryNeedFinding(this.processRepository, id, {inEntity: 'farmID', inUser: 'farmID'}, user);

        return this.processService.delete(id);
    }
}
