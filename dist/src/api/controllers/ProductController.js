"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const errors_1 = require("../errors");
const interceptors_1 = require("../interceptors");
const models_1 = require("../models");
const services_1 = require("../services");
const requests_1 = require("./requests");
const responses_1 = require("./responses");
const common_1 = require("../services/common");
const repositories_1 = require("../repositories");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const AuthHelper_1 = require("../../auth/AuthHelper");
const middlewares_1 = require("../middlewares");
let ProductController = class ProductController {
    constructor(productService, parseHelper, productRepository) {
        this.productService = productService;
        this.parseHelper = parseHelper;
        this.productRepository = productRepository;
    }
    find(query, user) {
        const queryParse = this.parseHelper.fullQueryParam(query);
        AuthHelper_1.AuthHelper.authQueryByWhereParam(queryParse.where, user, { inEntity: 'farmID', inUser: 'farmID' });
        return this.productService.find(queryParse);
    }
    create(body, user) {
        AuthHelper_1.AuthHelper.authQuery(body.farmID, 'farmID', user);
        const product = new models_1.Product();
        lodash_1.default.assign(product, body);
        return this.productService.create(product, body.medias);
    }
    findOne(id, query, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.productRepository, id, { inEntity: 'farmID', inUser: 'farmID' }, user);
            const queryParse = this.parseHelper.baseQueryParam(query);
            return yield this.productService.findOne(id, queryParse);
        });
    }
    update(id, body, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const bodyParse = this.parseHelper.removeUndefinedProperty(body);
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.productRepository, id, { inEntity: 'farmID', inUser: 'farmID' }, user);
            if (bodyParse.farmID) {
                AuthHelper_1.AuthHelper.authQuery(bodyParse.farmID, 'farmID', user);
            }
            return this.productService.update(id, bodyParse);
        });
    }
    delete(id, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.productRepository, id, { inEntity: 'farmID', inUser: 'farmID' }, user);
            return this.productService.delete(id);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get(),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      example order: {"createdAt": -1}, \n
                      example select: ["id", "name", "code", "productObjectsTotal"], \n
                      example where: {"farmID": "uuid example", "categoryID": "uuid example"} (need farmID to check auth owner farm), \n
                      example relations: ["medias", "productObjects"], \n
                      status: 0: 'activate', 1: 'deactivate', 2: 'pause', \n
                      unit: 0: 'item', 1: 'kilogram', 2: 'others' \n
                      duration: 0: 'day', 1: 'week', 2: 'month', 3: 'year' \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'`,
    }),
    middlewares_1.UseCache({ ttl: 1 }),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.ProductResponse)),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    routing_controllers_1.OnUndefined(errors_1.ProductNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ProductResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.QueryParams()),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.FullQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "find", null);
tslib_1.__decorate([
    routing_controllers_1.Post(),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      fields optional: productObjectsTotal, locationID, medias, barcode, code, unit, description, duration, durationType, isHaveBrand,
                      brandName, brandDescription, taxCode, email, phoneNumber, website, logo, banner, address, latitude, longitude, createdAt, \n
                      updatedAt, deletedAt, status \n
                      unit: 0: 'item', 1: 'kilogram', 2: 'others' \n
                      duration: 0: 'day', 1: 'week', 2: 'month', 3: 'year' \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'`,
    }),
    routing_controllers_1.OnUndefined(errors_1.ProductNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ProductResponse),
    tslib_1.__param(0, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.CreateProductBody, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/:id'),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      example select: ["id", "name", "code", "productObjectsTotal"], \n
                      example relations: ["certificationAbles", "certificationAbles.organization", "certificationAbles.certification", "medias", "location"], \n
                      status: 0: 'activate', 1: 'deactivate', 2: 'pause', \n
                      unit: 0: 'item', 1: 'kilogram', 2: 'others' \n
                      duration: 0: 'day', 1: 'week', 2: 'month', 3: 'year' \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'`,
    }),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.ProductDetailResponse)),
    routing_controllers_1.OnUndefined(errors_1.ProductNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ProductDetailResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.BaseQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "findOne", null);
tslib_1.__decorate([
    routing_controllers_1.Patch('/:id'),
    routing_controllers_1.OnUndefined(errors_1.ProductNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ProductResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.UpdateProductBody, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/:id'),
    routing_controllers_1.OnUndefined(errors_1.ProductNotFoundError),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
ProductController = tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.JsonController('/products'),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 401 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 404 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 500 }),
    tslib_1.__param(2, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__metadata("design:paramtypes", [services_1.ProductService,
        common_1.ParseHelper,
        repositories_1.ProductRepository])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map