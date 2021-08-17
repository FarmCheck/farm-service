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
import { TargetTypeService, CListData } from '../services';
import { TargetType } from '../models';
import { TargetTypeNotFoundError } from '../errors';
import { ClassTransformerInterceptor, ListResponseInterceptor } from '../interceptors';
import { ErrorResponse, BaseTargetType, TargetTypeResponse  } from './responses';
import { BaseQuery, FullQuery, UpdateTargetTypeBody } from './requests';
import { ParseHelper } from '../services/common';
import { CheckRoleFuncMiddleware } from '../middlewares';
import { UserRoles } from '../middlewares/CheckRoleFuncMiddleware';

@Authorized()
@JsonController('/target-types')
@ResponseSchema(ErrorResponse, {statusCode: 401})
@ResponseSchema(ErrorResponse, {statusCode: 404})
@ResponseSchema(ErrorResponse, {statusCode: 500})
export class TargetTypeController {
    constructor(private targetTypeService: TargetTypeService, private parseHelper: ParseHelper) {
    }

    @Get()
    @UseInterceptor(ClassTransformerInterceptor(TargetTypeResponse))
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(TargetTypeNotFoundError)
    @ResponseSchema(TargetTypeResponse, {isArray: true})
    public find(
        @QueryParams() query: FullQuery
    ): Promise<CListData<TargetType> | undefined> {
        const queryParse = this.parseHelper.fullQueryParam(query);

        return this.targetTypeService.find(queryParse);
    }

    @Post()
    @UseBefore(CheckRoleFuncMiddleware(UserRoles.admin))
    @OnUndefined(TargetTypeNotFoundError)
    @ResponseSchema(TargetTypeResponse)
    public create(
        @Body({required: true}) body: BaseTargetType
    ): Promise<TargetType | undefined> {
        const targetType = new TargetType();
        _.assign(targetType, body);

        return this.targetTypeService.create(targetType);
    }

    @Get('/:id')
    @UseInterceptor(ClassTransformerInterceptor(TargetTypeResponse))
    @OnUndefined(TargetTypeNotFoundError)
    @ResponseSchema(TargetTypeResponse)
    public async findOne(
        @Param('id') id: string,
        @QueryParams() query: BaseQuery
    ): Promise<TargetType | undefined> {
        const queryParse = this.parseHelper.baseQueryParam(query);

        return await this.targetTypeService.findOne(id, queryParse);
    }

    @Patch('/:id')
    @UseBefore(CheckRoleFuncMiddleware(UserRoles.admin))
    @OnUndefined(TargetTypeNotFoundError)
    @ResponseSchema(TargetTypeResponse)
    public update(
        @Param('id') id: string,
        @Body({required: true}) body: UpdateTargetTypeBody
    ): Promise<TargetType | undefined> {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);

        return this.targetTypeService.update(id, bodyParse);
    }

    @Delete('/:id')
    @UseBefore(CheckRoleFuncMiddleware(UserRoles.admin))
    @OnUndefined(TargetTypeNotFoundError)
    public delete(@Param('id') id: string): Promise<TargetType | undefined> {
        return this.targetTypeService.delete(id);
    }
}
