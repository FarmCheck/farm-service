"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificationController = void 0;
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
let CertificationController = class CertificationController {
    constructor(certificationService, parseHelper) {
        this.certificationService = certificationService;
        this.parseHelper = parseHelper;
    }
    find(query) {
        const queryParse = this.parseHelper.fullQueryParam(query);
        return this.certificationService.find(queryParse);
    }
    create(body) {
        const certification = new models_1.Certification();
        lodash_1.default.assign(certification, body);
        return this.certificationService.create(certification);
    }
    findOne(id, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParse = this.parseHelper.baseQueryParam(query);
            return yield this.certificationService.findOne(id, queryParse);
        });
    }
    update(id, body) {
        const bodyParse = this.parseHelper.removeUndefinedProperty(body);
        return this.certificationService.update(id, bodyParse);
    }
    delete(id) {
        return this.certificationService.delete(id);
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get(),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.CertificationResponse)),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    routing_controllers_1.OnUndefined(errors_1.CertificationNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.CertificationResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.QueryParams()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.FullQuery]),
    tslib_1.__metadata("design:returntype", Promise)
], CertificationController.prototype, "find", null);
tslib_1.__decorate([
    routing_controllers_1.Post(),
    routing_controllers_1.UseBefore(middlewares_1.CheckRoleFuncMiddleware(CheckRoleFuncMiddleware_1.UserRoles.admin)),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      fields optional: createdAt`,
    }),
    routing_controllers_1.OnUndefined(errors_1.CertificationNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.CertificationResponse),
    tslib_1.__param(0, routing_controllers_1.Body({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.CreateCertificationBody]),
    tslib_1.__metadata("design:returntype", Promise)
], CertificationController.prototype, "create", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/:id'),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.CertificationResponse)),
    routing_controllers_1.OnUndefined(errors_1.CertificationNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.CertificationResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.BaseQuery]),
    tslib_1.__metadata("design:returntype", Promise)
], CertificationController.prototype, "findOne", null);
tslib_1.__decorate([
    routing_controllers_1.Patch('/:id'),
    routing_controllers_1.UseBefore(middlewares_1.CheckRoleFuncMiddleware(CheckRoleFuncMiddleware_1.UserRoles.admin)),
    routing_controllers_1.OnUndefined(errors_1.CertificationNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.CertificationResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.Body({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.UpdateCertificationBody]),
    tslib_1.__metadata("design:returntype", Promise)
], CertificationController.prototype, "update", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/:id'),
    routing_controllers_1.UseBefore(middlewares_1.CheckRoleFuncMiddleware(CheckRoleFuncMiddleware_1.UserRoles.admin)),
    routing_controllers_1.OnUndefined(errors_1.CertificationNotFoundError),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CertificationController.prototype, "delete", null);
CertificationController = tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.JsonController('/certifications'),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 401 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 404 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 500 }),
    tslib_1.__metadata("design:paramtypes", [services_1.CertificationService, common_1.ParseHelper])
], CertificationController);
exports.CertificationController = CertificationController;
//# sourceMappingURL=CertificationController.js.map