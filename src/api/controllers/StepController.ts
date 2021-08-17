
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
import { StepService, CListData } from '../services';
import { Step } from '../models';
import { StepNotFoundError } from '../errors';
import { ClassTransformerInterceptor, ListResponseInterceptor } from '../interceptors';
import { ErrorResponse, StepResponse } from './responses';
import { BaseQuery, FullQuery, CreateStepBody, UpdateStepBody } from './requests';
import { ParseHelper } from '../services/common';
import { ProcessRepository, StepRepository } from '../repositories';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { AuthHelper } from '../../auth/AuthHelper';

@Authorized()
@JsonController('/steps')
@ResponseSchema(ErrorResponse, {statusCode: 401})
@ResponseSchema(ErrorResponse, {statusCode: 404})
@ResponseSchema(ErrorResponse, {statusCode: 500})
export class StepController {
    constructor(
        private stepService: StepService,
        private parseHelper: ParseHelper,
        @OrmRepository()
        private processRepository: ProcessRepository,
        @OrmRepository()
        private stepRepository: StepRepository
    ) {}

    @Get()
    @OpenAPI({
        description: `\n
                      example order: {"createdAt": -1}, \n
                      example select: ["id", "name"], \n
                      example where: { "process": {"farmID": "uuid example"}, "processID": "uuid example"} (need farmID to check auth owner farm) \n`,
    })
    @UseInterceptor(ClassTransformerInterceptor(StepResponse))
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(StepNotFoundError)
    @ResponseSchema(StepResponse, { isArray: true })
    public find(
        @QueryParams() query: FullQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<CListData<Step> | undefined> {
        const queryParse = this.parseHelper.fullQueryParam(query);
        AuthHelper.authQueryByWhereParam(queryParse.where, user, { inEntity: 'process.farmID', inUser: 'farmID' });

        return this.stepService.find(queryParse);
    }

    @Post()
    @OpenAPI({
        description: `\n
                      fields optional: isInternal, description \n
                      type of step property: 0: 'text', 1: 'number', 2: 'link'`,
    })
    @OnUndefined(StepNotFoundError)
    @ResponseSchema(StepResponse)
    public async create(
        @Body({ required: true }) body: CreateStepBody,
        @CurrentUser({required: true}) user: any
    ): Promise<Step | undefined> {
        await AuthHelper.authQueryNeedFinding(this.processRepository, body.processID, {inEntity: 'farmID', inUser: 'farmID'}, user);

        const step = new Step();
        _.assign(step, body);

        return this.stepService.create(step, body.stepProperties);
    }

    @Get('/:id')
    @UseInterceptor(ClassTransformerInterceptor(StepResponse))
    @OnUndefined(StepNotFoundError)
    @ResponseSchema(StepResponse)
    public async findOne(
        @Param('id') id: string,
        @QueryParams() query: BaseQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<Step | undefined> {
        await AuthHelper.authQueryNeedFinding(this.stepRepository, id, {inEntity: 'process.farmID', inUser: 'farmID'}, user, ['process']);
        const queryParse = this.parseHelper.baseQueryParam(query);

        return await this.stepService.findOne(id, queryParse);
    }

    @Patch('/:id')
    @OnUndefined(StepNotFoundError)
    @ResponseSchema(StepResponse)
    public async update(
        @Param('id') id: string,
        @Body({ required: true }) body: UpdateStepBody,
        @CurrentUser({required: true}) user: any
    ): Promise<Step | undefined> {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);

        const awaiters = [];
        awaiters.push(AuthHelper.authQueryNeedFinding(this.stepRepository, id, {inEntity: 'process.farmID', inUser: 'farmID'}, user, ['process']));

        if (bodyParse.processID) {
            awaiters.push(AuthHelper.authQueryNeedFinding(this.processRepository, bodyParse.processID, {inEntity: 'farmID', inUser: 'farmID'}, user));
        }

        await Promise.all(awaiters);

        return this.stepService.update(id, bodyParse);
    }

    @Delete('/:id')
    @OnUndefined(StepNotFoundError)
    public async delete(
        @Param('id') id: string,
        @CurrentUser({required: true}) user: any
    ): Promise<Step | undefined> {
        await AuthHelper.authQueryNeedFinding(this.stepRepository, id, {inEntity: 'process.farmID', inUser: 'farmID'}, user, ['process']);

        return this.stepService.delete(id);
    }
}
