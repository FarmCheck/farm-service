"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductObjectController = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const class_transformer_1 = require("class-transformer");
const typedi_1 = require("typedi");
const errors_1 = require("../errors");
const interceptors_1 = require("../interceptors");
const models_1 = require("../models");
const services_1 = require("../services");
const requests_1 = require("./requests");
const responses_1 = require("./responses");
const common_1 = require("../services/common");
const AuthHelper_1 = require("../../auth/AuthHelper");
const repositories_1 = require("../repositories");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const PortalResponse_1 = require("./responses/PortalResponse");
var ProductObjectQueryType;
(function (ProductObjectQueryType) {
    ProductObjectQueryType[ProductObjectQueryType["portal"] = 0] = "portal";
    ProductObjectQueryType[ProductObjectQueryType["diaries"] = 1] = "diaries";
})(ProductObjectQueryType || (ProductObjectQueryType = {}));
class ProductObjectDiariesQuery extends requests_1.BaseQuery {
    constructor() {
        super(...arguments);
        this.type = ProductObjectQueryType.portal;
    }
}
tslib_1.__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsIn([
        ProductObjectQueryType.portal,
        ProductObjectQueryType.diaries,
    ]),
    tslib_1.__metadata("design:type", Number)
], ProductObjectDiariesQuery.prototype, "type", void 0);
let ProductObjectController = class ProductObjectController {
    constructor(productObjectService, parseHelper, productRepository, processRepository, areaRepository, productObjectRepository) {
        this.productObjectService = productObjectService;
        this.parseHelper = parseHelper;
        this.productRepository = productRepository;
        this.processRepository = processRepository;
        this.areaRepository = areaRepository;
        this.productObjectRepository = productObjectRepository;
    }
    find(query, user) {
        const queryParse = this.parseHelper.fullQueryParam(query);
        AuthHelper_1.AuthHelper.authQueryByWhereParam(queryParse.where, user, { inEntity: 'product.farmID', inUser: 'farmID' });
        return this.productObjectService.find(queryParse);
    }
    create(body, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                AuthHelper_1.AuthHelper.authQueryNeedFinding(this.productRepository, body.productID, { inEntity: 'farmID', inUser: 'farmID' }, user),
                AuthHelper_1.AuthHelper.authQueryNeedFinding(this.processRepository, body.processID, { inEntity: 'farmID', inUser: 'farmID' }, user),
                AuthHelper_1.AuthHelper.authQueryNeedFinding(this.areaRepository, body.areaID, { inEntity: 'farmID', inUser: 'farmID' }, user),
            ]);
            const productObject = new models_1.ProductObject();
            lodash_1.default.assign(productObject, body);
            return this.productObjectService.create(productObject, body.medias);
        });
    }
    findOne(id, query, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParse = this.parseHelper.baseQueryParam(query);
            const transformOptions = {
                strategy: 'excludeAll',
                exposeUnsetFields: false,
            };
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.productObjectRepository, id, { inEntity: 'area.farmID', inUser: 'farmID' }, user, ['area']);
            const product = yield this.productObjectService
                .findOne(id, queryParse);
            return class_transformer_1.plainToClass(responses_1.ProductObjectDetailResponse, product, transformOptions);
        });
    }
    findOneForPortal(id, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParse = this.parseHelper.baseQueryParam(query);
            const { type } = queryParse;
            const transformOptions = {
                strategy: 'excludeAll',
                exposeUnsetFields: false,
            };
            if (type === ProductObjectQueryType.diaries) {
                const response = yield this.productObjectService
                    .findStepsWithDiaries(id);
                return class_transformer_1.plainToClass(PortalResponse_1.DiariesPortalResponse, response, transformOptions);
            }
            else {
                const product = yield this.productObjectService
                    .findOne(id, queryParse);
                return class_transformer_1.plainToClass(responses_1.ProductObjectPortalResponse, product, transformOptions);
            }
        });
    }
    findSections(id, fullQuery, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.productObjectRepository, id, { inEntity: 'area.farmID', inUser: 'farmID' }, user, ['area']);
            return this.productObjectService.getSections(id, fullQuery);
        });
    }
    // @Get('/:id/diaries')
    // @UseCache({ ttl: 10 })
    // @ClassTransformerInterceptor(DiariesPortalResponse)
    // @OnUndefined(ProductObjectNotFoundError)
    // @ResponseSchema(DiariesPortalResponse)
    // public async findDiary(
    //     @Param('id') id: string
    // ): Promise<DiariesPortalResponse> {
    //     return await this.productObjectService.findStepsWithDiaries(id);
    // }
    update(id, body, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const bodyParse = this.parseHelper.removeUndefinedProperty(body);
            const awaiters = [];
            awaiters.push(AuthHelper_1.AuthHelper.authQueryNeedFinding(this.productObjectRepository, id, { inEntity: 'area.farmID', inUser: 'farmID' }, user, ['area']));
            if (bodyParse.productID) {
                awaiters.push(AuthHelper_1.AuthHelper.authQueryNeedFinding(this.productRepository, bodyParse.productID, { inEntity: 'farmID', inUser: 'farmID' }, user));
            }
            if (bodyParse.processID) {
                awaiters.push(AuthHelper_1.AuthHelper.authQueryNeedFinding(this.processRepository, bodyParse.processID, { inEntity: 'farmID', inUser: 'farmID' }, user));
            }
            if (bodyParse.areaID) {
                awaiters.push(AuthHelper_1.AuthHelper.authQueryNeedFinding(this.areaRepository, bodyParse.areaID, { inEntity: 'farmID', inUser: 'farmID' }, user));
            }
            yield Promise.all(awaiters);
            return this.productObjectService.update(id, bodyParse);
        });
    }
    delete(id, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.productObjectRepository, id, { inEntity: 'area.farmID', inUser: 'farmID' }, user, ['area']);
            return this.productObjectService.delete(id);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get(),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      example order: {"createdAt": -1}, \n
                      example select: ["id", "name", "code"], \n
                      example where: { "product": {"farmID": "uuid example", "subCategory": {"categoryID": "uuid example"}}} (need farmID to check auth owner farm) \n
                      example relations: ["medias", "area"], \n
                      status: 0: 'activate', 1: 'deactivate', 2: 'pause', 3: 'draft', \n
                      type: 0: 'field plant', 1: 'farming plant', 2: 'production plant' \n
                      objectType: 0: 'tree', 1: 'bed', 2: 'all', 3: 'farm', 4: 'closed farm', 5: 'others' \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'`,
    }),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.ProductObjectResponse)),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    routing_controllers_1.OnUndefined(errors_1.ProductObjectNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ProductObjectResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.QueryParams()),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.FullQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductObjectController.prototype, "find", null);
tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Post(),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      fields optional: medias, code, type, objectType, description, createdAt, updatedAt, deletedAt, status \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'\n`,
    }),
    routing_controllers_1.OnUndefined(errors_1.ProductObjectNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ProductObjectResponse),
    tslib_1.__param(0, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.CreateProductObjectBody, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductObjectController.prototype, "create", null);
tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get('/:id'),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      example select: ["id", "name", "code"], \n
                      example relations: ["area", "process", "product", "sections", "medias"],\n
                      example relations for farm:
                                         ["product", "product.farm", "product.farm.location"], \n
                      example relations for product certification:
                                         ["product", "product.certificationAbles", "product.certificationAbles.organization",
                                         "product.certificationAbles.certification"], \n
                      status: 0: 'activate', 1: 'deactivate', 2: 'pause', \n
                      type: 0: 'field plant', 1: 'farming plant', 2: 'production plant' \n
                      objectType: 0: 'tree', 1: 'bed', 2: 'all', 3: 'farm', 4: 'closed farm', 5: 'others' \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'\n`,
    }),
    routing_controllers_1.OnUndefined(errors_1.ProductObjectNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ProductObjectDetailResponse, { description: 'default' }),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.BaseQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductObjectController.prototype, "findOne", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/:id/portal'),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      example select: ["id", "name", "code"], \n
                      example relations: ["area", "process", "product", "sections", "medias"],\n
                      example relations for farm:
                                         ["product", "product.farm", "product.farm.location"], \n
                      example relations for product certification:
                                         ["product", "product.certificationAbles", "product.certificationAbles.organization",
                                         "product.certificationAbles.certification"], \n
                      example query type: 0 - 'info for portal', 1 - 'steps and diaries for portal', \n
                      status: 0: 'activate', 1: 'deactivate', 2: 'pause', \n
                      type: 0: 'field plant', 1: 'farming plant', 2: 'production plant' \n
                      objectType: 0: 'tree', 1: 'bed', 2: 'all', 3: 'farm', 4: 'closed farm', 5: 'others' \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'\n`,
    }),
    routing_controllers_1.OnUndefined(errors_1.ProductObjectNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ProductObjectPortalResponse, { description: 'portal' }),
    routing_controllers_openapi_1.ResponseSchema(PortalResponse_1.DiariesPortalResponse, { description: 'diaries portal' }),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, ProductObjectDiariesQuery]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductObjectController.prototype, "findOneForPortal", null);
tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get('/:id/sections'),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    routing_controllers_1.OnUndefined(errors_1.ProductObjectNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.SectionDetailResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.FullQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductObjectController.prototype, "findSections", null);
tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Patch('/:id'),
    routing_controllers_1.OnUndefined(errors_1.ProductObjectNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ProductObjectResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.UpdateProductObjectBody, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductObjectController.prototype, "update", null);
tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Delete('/:id'),
    routing_controllers_1.OnUndefined(errors_1.ProductObjectNotFoundError),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductObjectController.prototype, "delete", null);
ProductObjectController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/product-objects'),
    typedi_1.Service(),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 401 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 404 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 500 }),
    tslib_1.__param(2, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(3, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(4, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(5, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__metadata("design:paramtypes", [services_1.ProductObjectService,
        common_1.ParseHelper,
        repositories_1.ProductRepository,
        repositories_1.ProcessRepository,
        repositories_1.AreaRepository,
        repositories_1.ProductObjectRepository])
], ProductObjectController);
exports.ProductObjectController = ProductObjectController;
//# sourceMappingURL=ProductObjectController.js.map