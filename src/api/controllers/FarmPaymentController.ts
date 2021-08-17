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
import { FarmPaymentService, CListData } from '../services';
import { FarmPayment } from '../models';
import { FarmPaymentNotFoundError } from '../errors';
import { ClassTransformerInterceptor, ListResponseInterceptor } from '../interceptors';
import { ErrorResponse, BaseFarmPayment, FarmPaymentResponse } from './responses';
import { BaseQuery, FullQuery, UpdateFarmPaymentBody } from './requests';
import { ParseHelper } from '../services/common';
import { AuthHelper } from '../../auth/AuthHelper';
import { FarmPaymentRepository } from '../repositories';
import { OrmRepository } from 'typeorm-typedi-extensions';

@Authorized()
@JsonController('/farm-payments')
// @OpenAPI({ security: [{ bearerAuth: [] }] })
@ResponseSchema(ErrorResponse, {statusCode: 401})
@ResponseSchema(ErrorResponse, {statusCode: 404})
@ResponseSchema(ErrorResponse, {statusCode: 500})
export class FarmPaymentController {
    constructor(
        private farmPaymentService: FarmPaymentService,
        private parseHelper: ParseHelper,
        @OrmRepository()
        private farmPaymentRepository: FarmPaymentRepository
    ) {}

    @Get()
    @OpenAPI({
        description: `\n
                      example order: {"createdAt": -1}, \n
                      example select: ["id", "name"], \n
                      example where: {"farmID": "uuid example"} (need farmID to check auth owner farm)\n
                      status: 0: 'activate', 1: 'deactivate', 2: 'pause', 3: 'draft' \n`,
    })
    @UseInterceptor(ClassTransformerInterceptor(FarmPaymentResponse))
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(FarmPaymentNotFoundError)
    @ResponseSchema(FarmPaymentResponse, { isArray: true })
    public find(
        @QueryParams() query: FullQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<CListData<FarmPayment> | undefined> {
        const queryParse = this.parseHelper.fullQueryParam(query);
        AuthHelper.authQueryByWhereParam(queryParse.where, user, {inEntity: 'farmID', inUser: 'farmID'});

        return this.farmPaymentService.find(queryParse);
    }

    @Post()
    @OnUndefined(FarmPaymentNotFoundError)
    @ResponseSchema(FarmPaymentResponse)
    public create(
        @Body({ required: true }) body: BaseFarmPayment,
        @CurrentUser({required: true}) user: any
    ): Promise<FarmPayment | undefined> {
        AuthHelper.authQuery(body.farmID, 'farmID', user);

        const farmPayment = new FarmPayment();
        _.assign(farmPayment, body);

        return this.farmPaymentService.create(farmPayment);
    }

    @Get('/:id')
    @UseInterceptor(ClassTransformerInterceptor(FarmPaymentResponse))
    @OnUndefined(FarmPaymentNotFoundError)
    @ResponseSchema(FarmPaymentResponse)
    public async findOne(
        @Param('id') id: string,
        @QueryParams() query: BaseQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<FarmPayment | undefined> {
        const queryParse = this.parseHelper.baseQueryParam(query);
        await AuthHelper.authQueryNeedFinding(this.farmPaymentRepository, id, {inEntity: 'farmID', inUser: 'farmID'}, user);

        return await this.farmPaymentService.findOne(id, queryParse);
    }

    @Patch('/:id')
    @OnUndefined(FarmPaymentNotFoundError)
    @ResponseSchema(FarmPaymentResponse)
    public async update(
        @Param('id') id: string,
        @Body({ required: true }) body: UpdateFarmPaymentBody,
        @CurrentUser({required: true}) user: any
    ): Promise<FarmPayment | undefined> {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);

        await AuthHelper.authQueryNeedFinding(this.farmPaymentRepository, id, {inEntity: 'farmID', inUser: 'farmID'}, user);

        if (bodyParse.farmID) {
            AuthHelper.authQuery(bodyParse.farmID, 'farmID', user);
        }

        return this.farmPaymentService.update(id, bodyParse);
    }

    @Delete('/:id')
    @OnUndefined(FarmPaymentNotFoundError)
    public async delete(
        @Param('id') id: string,
        @CurrentUser({required: true}) user: any
    ): Promise<FarmPayment | undefined> {
        await AuthHelper.authQueryNeedFinding(this.farmPaymentRepository, id, {inEntity: 'farmID', inUser: 'farmID'}, user);

        return this.farmPaymentService.delete(id);
    }
}
