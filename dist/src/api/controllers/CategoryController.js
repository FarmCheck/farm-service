"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const errors_1 = require("../errors");
const interceptors_1 = require("../interceptors");
const middlewares_1 = require("../middlewares");
const models_1 = require("../models");
const services_1 = require("../services");
const common_1 = require("../services/common");
const requests_1 = require("./requests");
const responses_1 = require("./responses");
const middlewares_2 = require("../middlewares");
const CheckRoleFuncMiddleware_1 = require("../middlewares/CheckRoleFuncMiddleware");
let CategoryController = class CategoryController {
    constructor(categoryService, parseHelper) {
        this.categoryService = categoryService;
        this.parseHelper = parseHelper;
    }
    find(query) {
        const queryParse = this.parseHelper.fullQueryParam(query);
        return this.categoryService.find(queryParse);
    }
    create(body, user) {
        const category = new models_1.Category();
        lodash_1.default.assign(category, body);
        return this.categoryService.create(category);
    }
    findOne(id, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParse = this.parseHelper.baseQueryParam(query);
            return yield this.categoryService.findOne(id, queryParse);
        });
    }
    update(id, body) {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);
        return this.categoryService.update(id, bodyParse);
    }
    delete(id) {
        return this.categoryService.delete(id);
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get(),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.CategoryResponse)),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    middlewares_1.UseCache({ ttl: 1, browser_ttl: 1 }),
    routing_controllers_1.OnUndefined(errors_1.CategoryNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.CategoryResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.QueryParams()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.FullQuery]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "find", null);
tslib_1.__decorate([
    routing_controllers_1.Post(),
    routing_controllers_1.UseBefore(middlewares_2.CheckRoleFuncMiddleware(CheckRoleFuncMiddleware_1.UserRoles.admin)),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      fields optional: code, note, createdAt`,
    }),
    routing_controllers_1.OnUndefined(errors_1.CategoryNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.CategoryResponse),
    tslib_1.__param(0, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.CreateCategoryBody, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/:id'),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.CategoryResponse)),
    routing_controllers_1.OnUndefined(errors_1.CategoryNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.CategoryResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.BaseQuery]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "findOne", null);
tslib_1.__decorate([
    routing_controllers_1.Patch('/:id'),
    routing_controllers_1.UseBefore(middlewares_2.CheckRoleFuncMiddleware(CheckRoleFuncMiddleware_1.UserRoles.admin)),
    routing_controllers_1.OnUndefined(errors_1.CategoryNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.CategoryResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.Body({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.UpdateCategoryBody]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/:id'),
    routing_controllers_1.UseBefore(middlewares_2.CheckRoleFuncMiddleware(CheckRoleFuncMiddleware_1.UserRoles.admin)),
    routing_controllers_1.OnUndefined(errors_1.CategoryNotFoundError),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "delete", null);
CategoryController = tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.JsonController('/categories')
    // @OpenAPI({security: [{basicAuth: []}]})
    ,
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 401 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 404 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 500 }),
    tslib_1.__metadata("design:paramtypes", [services_1.CategoryService, common_1.ParseHelper])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=CategoryController.js.map