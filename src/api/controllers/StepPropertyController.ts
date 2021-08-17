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
import { StepPropertyService, CListData } from '../services';
import { StepProperty } from '../models';
import { StepPropertyNotFoundError } from '../errors';
import { ClassTransformerInterceptor, ListResponseInterceptor } from '../interceptors';
import { ErrorResponse, StepPropertyResponse, BaseStepProperty } from './responses';
import { BaseQuery, FullQuery, UpdateStepPropertyBody } from './requests';
import { ParseHelper } from '../services/common';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { StepPropertyRepository, StepRepository } from '../repositories';
import { AuthHelper } from '../../auth/AuthHelper';

@Authorized()
@JsonController('/step-properties')
@ResponseSchema(ErrorResponse, {statusCode: 401})
@ResponseSchema(ErrorResponse, {statusCode: 404})
@ResponseSchema(ErrorResponse, {statusCode: 500})
export class StepPropertyController {
    constructor(
        private stepPropertyService: StepPropertyService,
        private parseHelper: ParseHelper,
        @OrmRepository()
        private stepRepository: StepRepository,
        @OrmRepository()
        private stepPropertyRepository: StepPropertyRepository
    ) {
    }

    @Get()
    @OpenAPI({
        description: `\n
                      example order: {"name": -1}, \n
                      example select: ["id", "name"], \n
                      example where: {"step": {"process": {"farmID": "uuid example"}}, "stepID": "uuid example"} (need farmID to check auth owner farm) \n`,
    })
    @UseInterceptor(ClassTransformerInterceptor(StepPropertyResponse))
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(StepPropertyNotFoundError)
    @ResponseSchema(StepPropertyResponse, {isArray: true})
    public find(
        @QueryParams() query: FullQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<CListData<StepProperty> | undefined> {
        const queryParse = this.parseHelper.fullQueryParam(query);
        AuthHelper.authQueryByWhereParam(queryParse.where, user, { inEntity: 'step.process.farmID', inUser: 'farmID' });

        return this.stepPropertyService.find(queryParse);
    }

    @Post()
    @OpenAPI({
        description: `\n
                      fields optional: isRequired, type`,
    })
    @OnUndefined(StepPropertyNotFoundError)
    @ResponseSchema(StepPropertyResponse)
    public async create(
        @Body({required: true}) body: BaseStepProperty,
        @CurrentUser({required: true}) user: any
    ): Promise<StepProperty | undefined> {
        await AuthHelper.authQueryNeedFinding(
            this.stepRepository,
            body.stepID,
            {
                inEntity: 'process.farmID',
                inUser: 'farmID',
            },
            user,
            ['process']
        );

        const stepProperty = new StepProperty();
        _.assign(stepProperty, body);

        return this.stepPropertyService.create(stepProperty);
    }

    @Get('/:id')
    @UseInterceptor(ClassTransformerInterceptor(StepPropertyResponse))
    @OnUndefined(StepPropertyNotFoundError)
    @ResponseSchema(StepPropertyResponse)
    public async findOne(
        @Param('id') id: string,
        @QueryParams() query: BaseQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<StepProperty | undefined> {
        await AuthHelper.authQueryNeedFinding(this.stepPropertyRepository, id, {inEntity: 'step.process.farmID', inUser: 'farmID'}, user, ['step', 'step.process']);
        const queryParse = this.parseHelper.baseQueryParam(query);

        return await this.stepPropertyService.findOne(id, queryParse);
    }

    @Patch('/:id')
    @OnUndefined(StepPropertyNotFoundError)
    @ResponseSchema(StepPropertyResponse)
    public async update(
        @Param('id') id: string,
        @Body({required: true}) body: UpdateStepPropertyBody,
        @CurrentUser({required: true}) user: any
    ): Promise<StepProperty | undefined> {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);

        const awaiters = [];
        awaiters.push(AuthHelper.authQueryNeedFinding(this.stepPropertyRepository, id, {inEntity: 'step.process.farmID', inUser: 'farmID'}, user, ['step', 'step.process']));

        if (bodyParse.stepID) {
            awaiters.push(AuthHelper.authQueryNeedFinding(this.stepRepository, bodyParse.stepID, {inEntity: 'process.farmID', inUser: 'farmID'}, user, ['process']));
        }

        await Promise.all(awaiters);

        return this.stepPropertyService.update(id, bodyParse);
    }

    @Delete('/:id')
    @OnUndefined(StepPropertyNotFoundError)
    public async delete(
        @Param('id') id: string,
        @CurrentUser({required: true}) user: any
    ): Promise<StepProperty | undefined> {
        await AuthHelper.authQueryNeedFinding(this.stepPropertyRepository, id, {inEntity: 'step.process.farmID', inUser: 'farmID'}, user, ['step', 'step.process']);

        return this.stepPropertyService.delete(id);
    }
}
