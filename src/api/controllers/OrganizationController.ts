import {
    Authorized,
    Body,
    Delete,
    Get,
    JsonController,
    OnUndefined,
    Param,
    Patch,
    Post,
    QueryParams, UseBefore,
    UseInterceptor,
} from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';
import _ from 'lodash';
import { OrganizationService, CListData } from '../services';
import { Organization } from '../models';
import { OrganizationNotFoundError } from '../errors';
import { ClassTransformerInterceptor, ListResponseInterceptor } from '../interceptors';
import { ErrorResponse, BaseOrganization, OrganizationResponse } from './responses';
import { BaseQuery, FullQuery, UpdateOrganizationBody } from './requests';
import { ParseHelper } from '../services/common';
import { CheckRoleFuncMiddleware } from '../middlewares';
import { UserRoles } from '../middlewares/CheckRoleFuncMiddleware';

@Authorized()
@JsonController('/organizations')
@ResponseSchema(ErrorResponse, {statusCode: 401})
@ResponseSchema(ErrorResponse, {statusCode: 404})
@ResponseSchema(ErrorResponse, {statusCode: 500})
export class OrganizationController {
    constructor(private organizationService: OrganizationService, private parseHelper: ParseHelper) {}

    @Get()
    @UseInterceptor(ClassTransformerInterceptor(OrganizationResponse))
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(OrganizationNotFoundError)
    @ResponseSchema(OrganizationResponse, { isArray: true })
    public find(
        @QueryParams() query: FullQuery
    ): Promise<CListData<Organization> | undefined> {
        const queryParse = this.parseHelper.fullQueryParam(query);

        return this.organizationService.find(queryParse);
    }

    @Post()
    @UseBefore(CheckRoleFuncMiddleware(UserRoles.admin))
    @OnUndefined(OrganizationNotFoundError)
    @ResponseSchema(OrganizationResponse)
    public create(
        @Body({ required: true }) body: BaseOrganization
    ): Promise<Organization | undefined> {
        const organization = new Organization();
        _.assign(organization, body);

        return this.organizationService.create(organization);
    }

    @Get('/:id')
    @UseInterceptor(ClassTransformerInterceptor(OrganizationResponse))
    @OnUndefined(OrganizationNotFoundError)
    @ResponseSchema(OrganizationResponse)
    public async findOne(
        @Param('id') id: string,
        @QueryParams() query: BaseQuery
    ): Promise<Organization | undefined> {
        const queryParse = this.parseHelper.baseQueryParam(query);

        return await this.organizationService.findOne(id, queryParse);
    }

    @Patch('/:id')
    @UseBefore(CheckRoleFuncMiddleware(UserRoles.admin))
    @OnUndefined(OrganizationNotFoundError)
    @ResponseSchema(OrganizationResponse)
    public update(
        @Param('id') id: string,
        @Body({ required: true }) body: UpdateOrganizationBody
    ): Promise<Organization | undefined> {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);

        return this.organizationService.update(id, bodyParse);
    }

    @Delete('/:id')
    @UseBefore(CheckRoleFuncMiddleware(UserRoles.admin))
    @OnUndefined(OrganizationNotFoundError)
    public delete(@Param('id') id: string): Promise<Organization | undefined> {
        return this.organizationService.delete(id);
    }
}
