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
import { LocationService, CListData } from '../services';
import { Location } from '../models';
import { LocationNotFoundError } from '../errors';
import { ClassTransformerInterceptor, ListResponseInterceptor } from '../interceptors';
import { ErrorResponse, LocationResponse, BaseLocation } from './responses';
import { BaseQuery, FullQuery, UpdateLocationBody } from './requests';
import { ParseHelper } from '../services/common';
import { CheckRoleFuncMiddleware } from '../middlewares';
import { UserRoles } from '../middlewares/CheckRoleFuncMiddleware';

@Authorized()
@JsonController('/locations')
@ResponseSchema(ErrorResponse, {statusCode: 401})
@ResponseSchema(ErrorResponse, {statusCode: 404})
@ResponseSchema(ErrorResponse, {statusCode: 500})
export class LocationController {
    constructor(private locationService: LocationService, private parseHelper: ParseHelper) {}

    @Get()
    @UseInterceptor(ClassTransformerInterceptor(LocationResponse))
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(LocationNotFoundError)
    @ResponseSchema(LocationResponse, { isArray: true })
    public find(
        @QueryParams() query: FullQuery
    ): Promise<CListData<Location> | undefined> {
        const queryParse = this.parseHelper.fullQueryParam(query);

        return this.locationService.find(queryParse);
    }

    @Post()
    @UseBefore(CheckRoleFuncMiddleware(UserRoles.admin))
    @OnUndefined(LocationNotFoundError)
    @ResponseSchema(LocationResponse)
    public create(
        @Body({ required: true }) body: BaseLocation
    ): Promise<Location | undefined> {
        const location = new Location();
        _.assign(location, body);

        return this.locationService.create(location);
    }

    @Get('/:id')
    @UseInterceptor(ClassTransformerInterceptor(LocationResponse))
    @OnUndefined(LocationNotFoundError)
    @ResponseSchema(LocationResponse)
    public async findOne(
        @Param('id') id: string,
        @QueryParams() query: BaseQuery
    ): Promise<Location | undefined> {
        const queryParse = this.parseHelper.baseQueryParam(query);

        return await this.locationService.findOne(id, queryParse);
    }

    @Patch('/:id')
    @UseBefore(CheckRoleFuncMiddleware(UserRoles.admin))
    @OnUndefined(LocationNotFoundError)
    @ResponseSchema(LocationResponse)
    public update(
        @Param('id') id: string,
        @Body({ required: true }) body: UpdateLocationBody
    ): Promise<Location | undefined> {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);

        return this.locationService.update(id, bodyParse);
    }

    @Delete('/:id')
    @UseBefore(CheckRoleFuncMiddleware(UserRoles.admin))
    @OnUndefined(LocationNotFoundError)
    public delete(@Param('id') id: string): Promise<Location | undefined> {
        return this.locationService.delete(id);
    }
}
