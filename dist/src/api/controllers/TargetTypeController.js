"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetTypeController = void 0;
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
let TargetTypeController = class TargetTypeController {
    constructor(targetTypeService, parseHelper) {
        this.targetTypeService = targetTypeService;
        this.parseHelper = parseHelper;
    }
    find(query) {
        const queryParse = this.parseHelper.fullQueryParam(query);
        return this.targetTypeService.find(queryParse);
    }
    create(body) {
        const targetType = new models_1.TargetType();
        lodash_1.default.assign(targetType, body);
        return this.targetTypeService.create(targetType);
    }
    findOne(id, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParse = this.parseHelper.baseQueryParam(query);
            return yield this.targetTypeService.findOne(id, queryParse);
        });
    }
    update(id, body) {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);
        return this.targetTypeService.update(id, bodyParse);
    }
    delete(id) {
        return this.targetTypeService.delete(id);
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get(),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.TargetTypeResponse)),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    routing_controllers_1.OnUndefined(errors_1.TargetTypeNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.TargetTypeResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.QueryParams()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.FullQuery]),
    tslib_1.__metadata("design:returntype", Promise)
], TargetTypeController.prototype, "find", null);
tslib_1.__decorate([
    routing_controllers_1.Post(),
    routing_controllers_1.UseBefore(middlewares_1.CheckRoleFuncMiddleware(CheckRoleFuncMiddleware_1.UserRoles.admin)),
    routing_controllers_1.OnUndefined(errors_1.TargetTypeNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.TargetTypeResponse),
    tslib_1.__param(0, routing_controllers_1.Body({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [responses_1.BaseTargetType]),
    tslib_1.__metadata("design:returntype", Promise)
], TargetTypeController.prototype, "create", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/:id'),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.TargetTypeResponse)),
    routing_controllers_1.OnUndefined(errors_1.TargetTypeNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.TargetTypeResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.BaseQuery]),
    tslib_1.__metadata("design:returntype", Promise)
], TargetTypeController.prototype, "findOne", null);
tslib_1.__decorate([
    routing_controllers_1.Patch('/:id'),
    routing_controllers_1.UseBefore(middlewares_1.CheckRoleFuncMiddleware(CheckRoleFuncMiddleware_1.UserRoles.admin)),
    routing_controllers_1.OnUndefined(errors_1.TargetTypeNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.TargetTypeResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.Body({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.UpdateTargetTypeBody]),
    tslib_1.__metadata("design:returntype", Promise)
], TargetTypeController.prototype, "update", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/:id'),
    routing_controllers_1.UseBefore(middlewares_1.CheckRoleFuncMiddleware(CheckRoleFuncMiddleware_1.UserRoles.admin)),
    routing_controllers_1.OnUndefined(errors_1.TargetTypeNotFoundError),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], TargetTypeController.prototype, "delete", null);
TargetTypeController = tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.JsonController('/target-types'),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 401 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 404 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 500 }),
    tslib_1.__metadata("design:paramtypes", [services_1.TargetTypeService, common_1.ParseHelper])
], TargetTypeController);
exports.TargetTypeController = TargetTypeController;
//# sourceMappingURL=TargetTypeController.js.map