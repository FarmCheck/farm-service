"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const services_1 = require("../services");
const models_1 = require("../models");
const errors_1 = require("../errors");
const interceptors_1 = require("../interceptors");
const responses_1 = require("./responses");
const requests_1 = require("./requests");
const common_1 = require("../services/common");
const middlewares_1 = require("../middlewares");
const CheckRoleFuncMiddleware_1 = require("../middlewares/CheckRoleFuncMiddleware");
let SubCategoryController = class SubCategoryController {
    constructor(subCategoryService, parseHelper) {
        this.subCategoryService = subCategoryService;
        this.parseHelper = parseHelper;
    }
    find(query) {
        const queryParse = this.parseHelper.fullQueryParam(query);
        return this.subCategoryService.find(queryParse);
    }
    create(body) {
        const subCategory = new models_1.SubCategory();
        lodash_1.default.assign(subCategory, body);
        return this.subCategoryService.create(subCategory);
    }
    findOne(id, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParse = this.parseHelper.baseQueryParam(query);
            return yield this.subCategoryService.findOne(id, queryParse);
        });
    }
    update(id, body) {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);
        return this.subCategoryService.update(id, bodyParse);
    }
    delete(id) {
        return this.subCategoryService.delete(id);
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get(),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.SubCategoryResponse)),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    routing_controllers_1.OnUndefined(errors_1.SubCategoryNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.SubCategoryResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.QueryParams()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.FullQuery]),
    tslib_1.__metadata("design:returntype", Promise)
], SubCategoryController.prototype, "find", null);
tslib_1.__decorate([
    routing_controllers_1.Post(),
    routing_controllers_1.UseBefore(middlewares_1.CheckRoleFuncMiddleware(CheckRoleFuncMiddleware_1.UserRoles.admin)),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      fields optional: code, note, createdAt`,
    }),
    routing_controllers_1.OnUndefined(errors_1.SubCategoryNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.SubCategoryResponse),
    tslib_1.__param(0, routing_controllers_1.Body({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.CreateSubCategoryBody]),
    tslib_1.__metadata("design:returntype", Promise)
], SubCategoryController.prototype, "create", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/:id'),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.SubCategoryResponse)),
    routing_controllers_1.OnUndefined(errors_1.SubCategoryNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.SubCategoryResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.BaseQuery]),
    tslib_1.__metadata("design:returntype", Promise)
], SubCategoryController.prototype, "findOne", null);
tslib_1.__decorate([
    routing_controllers_1.Patch('/:id'),
    routing_controllers_1.UseBefore(middlewares_1.CheckRoleFuncMiddleware(CheckRoleFuncMiddleware_1.UserRoles.admin)),
    routing_controllers_1.OnUndefined(errors_1.SubCategoryNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.SubCategoryResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.Body({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.UpdateSubCategoryBody]),
    tslib_1.__metadata("design:returntype", Promise)
], SubCategoryController.prototype, "update", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/:id'),
    routing_controllers_1.UseBefore(middlewares_1.CheckRoleFuncMiddleware(CheckRoleFuncMiddleware_1.UserRoles.admin)),
    routing_controllers_1.OnUndefined(errors_1.SubCategoryNotFoundError),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], SubCategoryController.prototype, "delete", null);
SubCategoryController = tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.JsonController('/sub-categories'),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 401 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 404 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 500 }),
    tslib_1.__metadata("design:paramtypes", [services_1.SubCategoryService, common_1.ParseHelper])
], SubCategoryController);
exports.SubCategoryController = SubCategoryController;
//# sourceMappingURL=SubCategoryController.js.map