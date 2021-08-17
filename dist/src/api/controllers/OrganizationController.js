"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationController = void 0;
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
let OrganizationController = class OrganizationController {
    constructor(organizationService, parseHelper) {
        this.organizationService = organizationService;
        this.parseHelper = parseHelper;
    }
    find(query) {
        const queryParse = this.parseHelper.fullQueryParam(query);
        return this.organizationService.find(queryParse);
    }
    create(body) {
        const organization = new models_1.Organization();
        lodash_1.default.assign(organization, body);
        return this.organizationService.create(organization);
    }
    findOne(id, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParse = this.parseHelper.baseQueryParam(query);
            return yield this.organizationService.findOne(id, queryParse);
        });
    }
    update(id, body) {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);
        return this.organizationService.update(id, bodyParse);
    }
    delete(id) {
        return this.organizationService.delete(id);
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get(),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.OrganizationResponse)),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    routing_controllers_1.OnUndefined(errors_1.OrganizationNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.OrganizationResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.QueryParams()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.FullQuery]),
    tslib_1.__metadata("design:returntype", Promise)
], OrganizationController.prototype, "find", null);
tslib_1.__decorate([
    routing_controllers_1.Post(),
    routing_controllers_1.UseBefore(middlewares_1.CheckRoleFuncMiddleware(CheckRoleFuncMiddleware_1.UserRoles.admin)),
    routing_controllers_1.OnUndefined(errors_1.OrganizationNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.OrganizationResponse),
    tslib_1.__param(0, routing_controllers_1.Body({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [responses_1.BaseOrganization]),
    tslib_1.__metadata("design:returntype", Promise)
], OrganizationController.prototype, "create", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/:id'),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.OrganizationResponse)),
    routing_controllers_1.OnUndefined(errors_1.OrganizationNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.OrganizationResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.BaseQuery]),
    tslib_1.__metadata("design:returntype", Promise)
], OrganizationController.prototype, "findOne", null);
tslib_1.__decorate([
    routing_controllers_1.Patch('/:id'),
    routing_controllers_1.UseBefore(middlewares_1.CheckRoleFuncMiddleware(CheckRoleFuncMiddleware_1.UserRoles.admin)),
    routing_controllers_1.OnUndefined(errors_1.OrganizationNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.OrganizationResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.Body({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.UpdateOrganizationBody]),
    tslib_1.__metadata("design:returntype", Promise)
], OrganizationController.prototype, "update", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/:id'),
    routing_controllers_1.UseBefore(middlewares_1.CheckRoleFuncMiddleware(CheckRoleFuncMiddleware_1.UserRoles.admin)),
    routing_controllers_1.OnUndefined(errors_1.OrganizationNotFoundError),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], OrganizationController.prototype, "delete", null);
OrganizationController = tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.JsonController('/organizations'),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 401 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 404 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 500 }),
    tslib_1.__metadata("design:paramtypes", [services_1.OrganizationService, common_1.ParseHelper])
], OrganizationController);
exports.OrganizationController = OrganizationController;
//# sourceMappingURL=OrganizationController.js.map