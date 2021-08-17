"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmPaymentController = void 0;
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
let FarmPaymentController = class FarmPaymentController {
    constructor(farmPaymentService, parseHelper, farmPaymentRepository) {
        this.farmPaymentService = farmPaymentService;
        this.parseHelper = parseHelper;
        this.farmPaymentRepository = farmPaymentRepository;
    }
    find(query, user) {
        const queryParse = this.parseHelper.fullQueryParam(query);
        AuthHelper_1.AuthHelper.authQueryByWhereParam(queryParse.where, user, { inEntity: 'farmID', inUser: 'farmID' });
        return this.farmPaymentService.find(queryParse);
    }
    create(body, user) {
        AuthHelper_1.AuthHelper.authQuery(body.farmID, 'farmID', user);
        const farmPayment = new models_1.FarmPayment();
        lodash_1.default.assign(farmPayment, body);
        return this.farmPaymentService.create(farmPayment);
    }
    findOne(id, query, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParse = this.parseHelper.baseQueryParam(query);
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.farmPaymentRepository, id, { inEntity: 'farmID', inUser: 'farmID' }, user);
            return yield this.farmPaymentService.findOne(id, queryParse);
        });
    }
    update(id, body, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const bodyParse = this.parseHelper.removeUndefinedProperty(body);
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.farmPaymentRepository, id, { inEntity: 'farmID', inUser: 'farmID' }, user);
            if (bodyParse.farmID) {
                AuthHelper_1.AuthHelper.authQuery(bodyParse.farmID, 'farmID', user);
            }
            return this.farmPaymentService.update(id, bodyParse);
        });
    }
    delete(id, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.farmPaymentRepository, id, { inEntity: 'farmID', inUser: 'farmID' }, user);
            return this.farmPaymentService.delete(id);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get(),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      example order: {"createdAt": -1}, \n
                      example select: ["id", "name"], \n
                      example where: {"farmID": "uuid example"} (need farmID to check auth owner farm)\n
                      status: 0: 'activate', 1: 'deactivate', 2: 'pause', 3: 'draft' \n`,
    }),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.FarmPaymentResponse)),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    routing_controllers_1.OnUndefined(errors_1.FarmPaymentNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.FarmPaymentResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.QueryParams()),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.FullQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FarmPaymentController.prototype, "find", null);
tslib_1.__decorate([
    routing_controllers_1.Post(),
    routing_controllers_1.OnUndefined(errors_1.FarmPaymentNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.FarmPaymentResponse),
    tslib_1.__param(0, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [responses_1.BaseFarmPayment, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FarmPaymentController.prototype, "create", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/:id'),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.FarmPaymentResponse)),
    routing_controllers_1.OnUndefined(errors_1.FarmPaymentNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.FarmPaymentResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.BaseQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FarmPaymentController.prototype, "findOne", null);
tslib_1.__decorate([
    routing_controllers_1.Patch('/:id'),
    routing_controllers_1.OnUndefined(errors_1.FarmPaymentNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.FarmPaymentResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.UpdateFarmPaymentBody, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FarmPaymentController.prototype, "update", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/:id'),
    routing_controllers_1.OnUndefined(errors_1.FarmPaymentNotFoundError),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FarmPaymentController.prototype, "delete", null);
FarmPaymentController = tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.JsonController('/farm-payments')
    // @OpenAPI({ security: [{ bearerAuth: [] }] })
    ,
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 401 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 404 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 500 }),
    tslib_1.__param(2, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__metadata("design:paramtypes", [services_1.FarmPaymentService,
        common_1.ParseHelper,
        repositories_1.FarmPaymentRepository])
], FarmPaymentController);
exports.FarmPaymentController = FarmPaymentController;
//# sourceMappingURL=FarmPaymentController.js.map