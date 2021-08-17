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
import { EmployeeService, CListData } from '../services';
import { Employee } from '../models';
import { EmployeeNotFoundError } from '../errors';
import { ClassTransformerInterceptor, ListResponseInterceptor } from '../interceptors';
import { ErrorResponse, EmployeeResponse, EmployeeDetailResponse } from './responses';
import { BaseQuery, FullQuery, CreateEmployeeBody, UpdateEmployeeBody } from './requests';
import { ParseHelper } from '../services/common';
import { AuthHelper } from '../../auth/AuthHelper';
import { EmployeeRepository } from '../repositories';
import { OrmRepository } from 'typeorm-typedi-extensions';

@Authorized()
@JsonController('/employees')
@ResponseSchema(ErrorResponse, {statusCode: 401})
@ResponseSchema(ErrorResponse, {statusCode: 404})
@ResponseSchema(ErrorResponse, {statusCode: 500})
export class EmployeeController {
    constructor(
        private employeeService: EmployeeService,
        private parseHelper: ParseHelper,
        @OrmRepository()
        private employeeRepository: EmployeeRepository
    ) {
    }

    @Get()
    @OpenAPI({
        description: `\n
                      example order: {"createdAt": -1}, \n
                      example select: ["id", "name", "code", "phoneNumber"], \n
                      example where: {"farmID": "uuid example"} (need farmID to check auth owner farm)\n
                      status: 0: 'activate', 1: 'deactivate', \n
                      type of media: 0: 'image', 1: 'video', 2: 'document', \n
                      role: 0: 'employee', 1: 'farmer', 2: 'manager'`,
    })
    @UseInterceptor(ClassTransformerInterceptor(EmployeeResponse))
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(EmployeeNotFoundError)
    @ResponseSchema(EmployeeResponse, {isArray: true})
    public find(
        @QueryParams() query: FullQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<CListData<Employee> | undefined> {
        const queryParse = this.parseHelper.fullQueryParam(query);
        AuthHelper.authQueryByWhereParam(queryParse.where, user, { inEntity: 'farmID', inUser: 'farmID' });

        return this.employeeService.find(queryParse);
    }

    @Post()
    @OpenAPI({
        description: `\n
                      fields optional: isVerifiedPhoneNumber, medias, code, role, createdAt, updatedAt, deletedAt, status, \n
                      type of media: 0: 'image', 1: 'video', 2: 'document', \n
                      role: 0: 'employee', 1: 'farmer', 2: 'manager'`,
    })
    @OnUndefined(EmployeeNotFoundError)
    @ResponseSchema(EmployeeResponse)
    public async create(
        @CurrentUser({required: true}) user: any,
        @Body({required: true}) body: CreateEmployeeBody
    ): Promise<Employee | undefined> {
        AuthHelper.authQuery(body.farmID, 'farmID', user);
        const employee = new Employee();
        _.assign(employee, body);

        return this.employeeService.create(employee);
    }

    @Get('/:id')
    @OpenAPI({
        description: `\n
                      example select: ["id", "name", "code", "phoneNumber"], \n
                      example relations: ["farm"], \n
                      status: 0: 'activate', 1: 'deactivate', \n
                      role: 0: 'employee', 1: 'farmer', 2: 'manager'`,
    })

    @UseInterceptor(ClassTransformerInterceptor(EmployeeDetailResponse))
    @OnUndefined(EmployeeNotFoundError)
    @ResponseSchema(EmployeeDetailResponse)
    public async findOne(
        @Param('id') id: string,
        @QueryParams() query: BaseQuery,
        @CurrentUser({required: true}) user: any
    ): Promise<Employee | undefined> {
        const queryParse = this.parseHelper.baseQueryParam(query);
        await AuthHelper.authQueryNeedFinding(this.employeeRepository, id, {inEntity: 'farmID', inUser: 'farmID'}, user);

        return await this.employeeService.findOne(id, queryParse);
    }

    @Patch('/:id')
    @OnUndefined(EmployeeNotFoundError)
    @ResponseSchema(EmployeeResponse)
    public async update(
        @Param('id') id: string,
        @Body({required: true}) body: UpdateEmployeeBody,
        @CurrentUser({required: true}) user: any
    ): Promise<Employee | undefined> {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);

        await AuthHelper.authQueryNeedFinding(this.employeeRepository, id, {inEntity: 'farmID', inUser: 'farmID'}, user);

        if (bodyParse.farmID) {
            AuthHelper.authQuery(bodyParse.farmID, 'farmID', user);
        }

        return this.employeeService.update(id, bodyParse);
    }

    @Delete('/:id')
    @OnUndefined(EmployeeNotFoundError)
    public async delete(
        @Param('id') id: string,
        @CurrentUser({required: true}) user: any
    ): Promise<Employee | undefined> {
        await AuthHelper.authQueryNeedFinding(
            this.employeeRepository,
            id,
            {
                inEntity: 'farmID',
                inUser: 'farmID',
            },
            user);

        return this.employeeService.delete(id);
    }
}
