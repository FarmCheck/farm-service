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
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import _ from 'lodash';
import { CertificationService, CListData } from '../services';
import { Certification } from '../models';
import { CertificationNotFoundError } from '../errors';
import { ClassTransformerInterceptor, ListResponseInterceptor } from '../interceptors';
import { ErrorResponse, CertificationResponse } from './responses';
import { BaseQuery, FullQuery, CreateCertificationBody, UpdateCertificationBody } from './requests';
import { ParseHelper } from '../services/common';
import { CheckRoleFuncMiddleware } from '../middlewares';
import { UserRoles } from '../middlewares/CheckRoleFuncMiddleware';

@Authorized()
@JsonController('/certifications')
@ResponseSchema(ErrorResponse, {statusCode: 401})
@ResponseSchema(ErrorResponse, {statusCode: 404})
@ResponseSchema(ErrorResponse, {statusCode: 500})
export class CertificationController {
    constructor(private certificationService: CertificationService, private parseHelper: ParseHelper) {
    }

    @Get()
    @UseInterceptor(ClassTransformerInterceptor(CertificationResponse))
    @UseInterceptor(ListResponseInterceptor)
    @OnUndefined(CertificationNotFoundError)
    @ResponseSchema(CertificationResponse, {isArray: true})
    public find(
        @QueryParams() query: FullQuery
    ): Promise<CListData<Certification> | undefined> {
        const queryParse = this.parseHelper.fullQueryParam(query);

        return this.certificationService.find(queryParse);
    }

    @Post()
    @UseBefore(CheckRoleFuncMiddleware(UserRoles.admin))
    @OpenAPI({
        description: `\n
                      fields optional: createdAt`,
    })
    @OnUndefined(CertificationNotFoundError)
    @ResponseSchema(CertificationResponse)
    public create(
        @Body({required: true}) body: CreateCertificationBody
    ): Promise<Certification | undefined> {
        const certification = new Certification();
        _.assign(certification, body);

        return this.certificationService.create(certification);
    }

    @Get('/:id')
    @UseInterceptor(ClassTransformerInterceptor(CertificationResponse))
    @OnUndefined(CertificationNotFoundError)
    @ResponseSchema(CertificationResponse)
    public async findOne(
        @Param('id') id: string,
        @QueryParams() query: BaseQuery
    ): Promise<Certification | undefined> {
        const queryParse = this.parseHelper.baseQueryParam(query);

        return await this.certificationService.findOne(id, queryParse);
    }

    @Patch('/:id')
    @UseBefore(CheckRoleFuncMiddleware(UserRoles.admin))
    @OnUndefined(CertificationNotFoundError)
    @ResponseSchema(CertificationResponse)
    public update(
        @Param('id') id: string,
        @Body({required: true}) body: UpdateCertificationBody
    ): Promise<Certification | undefined> {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);

        return this.certificationService.update(id, bodyParse);
    }

    @Delete('/:id')
    @UseBefore(CheckRoleFuncMiddleware(UserRoles.admin))
    @OnUndefined(CertificationNotFoundError)
    public delete(@Param('id') id: string): Promise<Certification | undefined> {
        return this.certificationService.delete(id);
    }
}
