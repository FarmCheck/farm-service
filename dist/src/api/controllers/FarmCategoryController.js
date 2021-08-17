"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmCategoryController = void 0;
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
const AuthHelper_1 = require("../../auth/AuthHelper");
const repositories_1 = require("../repositories");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
let FarmCategoryController = class FarmCategoryController {
    constructor(farmCategoryService, parseHelper, farmCategoryRepository) {
        this.farmCategoryService = farmCategoryService;
        this.parseHelper = parseHelper;
        this.farmCategoryRepository = farmCategoryRepository;
    }
    find(query, user) {
        const queryParse = this.parseHelper.fullQueryParam(query);
        AuthHelper_1.AuthHelper.authQueryByWhereParam(queryParse.where, user, { inEntity: 'farmID', inUser: 'farmID' });
        return this.farmCategoryService.find(queryParse);
    }
    create(body, user) {
        AuthHelper_1.AuthHelper.authQuery(body.farmID, 'farmID', user);
        const farmCategory = new models_1.FarmCategory();
        lodash_1.default.assign(farmCategory, body);
        return this.farmCategoryService.create(farmCategory);
    }
    findOne(id, query, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.farmCategoryRepository, id, { inEntity: 'farmID', inUser: 'farmID' }, user);
            const queryParse = this.parseHelper.baseQueryParam(query);
            return yield this.farmCategoryService.findOne(id, queryParse);
        });
    }
    update(id, body, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const bodyParse = this.parseHelper.removeUndefinedProperty(body);
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.farmCategoryRepository, id, { inEntity: 'farmID', inUser: 'farmID' }, user);
            if (bodyParse.farmID) {
                AuthHelper_1.AuthHelper.authQuery(bodyParse.farmID, 'farmID', user);
            }
            return this.farmCategoryService.update(id, bodyParse);
        });
    }
    delete(id, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.farmCategoryRepository, id, { inEntity: 'farmID', inUser: 'farmID' }, user);
            return this.farmCategoryService.delete(id);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get(),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      example where: {"farmID": "uuid example"} (need farmID to check auth owner farm)\n`,
    }),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.FarmCategoryResponse)),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    routing_controllers_1.OnUndefined(errors_1.FarmCategoryNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.FarmCategoryResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.QueryParams()),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.FullQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FarmCategoryController.prototype, "find", null);
tslib_1.__decorate([
    routing_controllers_1.Post(),
    routing_controllers_1.OnUndefined(errors_1.FarmCategoryNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.FarmCategoryResponse),
    tslib_1.__param(0, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [responses_1.BaseFarmCategory, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FarmCategoryController.prototype, "create", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/:id'),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.FarmCategoryResponse)),
    routing_controllers_1.OnUndefined(errors_1.FarmCategoryNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.FarmCategoryResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.BaseQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FarmCategoryController.prototype, "findOne", null);
tslib_1.__decorate([
    routing_controllers_1.Patch('/:id'),
    routing_controllers_1.OnUndefined(errors_1.FarmCategoryNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.FarmCategoryResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.UpdateFarmCategoryBody, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FarmCategoryController.prototype, "update", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/:id'),
    routing_controllers_1.OnUndefined(errors_1.FarmCategoryNotFoundError),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FarmCategoryController.prototype, "delete", null);
FarmCategoryController = tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.JsonController('/farm-categories'),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 401 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 404 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 500 }),
    tslib_1.__param(2, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__metadata("design:paramtypes", [services_1.FarmCategoryService,
        common_1.ParseHelper,
        repositories_1.FarmCategoryRepository])
], FarmCategoryController);
exports.FarmCategoryController = FarmCategoryController;
//# sourceMappingURL=FarmCategoryController.js.map