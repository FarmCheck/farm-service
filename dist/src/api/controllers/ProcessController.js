"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessController = void 0;
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
const repositories_1 = require("../repositories");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const AuthHelper_1 = require("../../auth/AuthHelper");
let ProcessController = class ProcessController {
    constructor(processService, parseHelper, processRepository) {
        this.processService = processService;
        this.parseHelper = parseHelper;
        this.processRepository = processRepository;
    }
    find(query, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParse = this.parseHelper.fullQueryParam(query);
            AuthHelper_1.AuthHelper.authQueryByWhereParam(queryParse.where, user, { inEntity: 'farmID', inUser: 'farmID' });
            return this.processService.find(queryParse);
        });
    }
    create(body, user) {
        AuthHelper_1.AuthHelper.authQuery(body.farmID, 'farmID', user);
        const process = new models_1.Process();
        lodash_1.default.assign(process, body);
        return this.processService.create(process);
    }
    findOne(id, query, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.processRepository, id, { inEntity: 'farmID', inUser: 'farmID' }, user);
            const queryParse = this.parseHelper.baseQueryParam(query);
            return yield this.processService.findOne(id, queryParse);
        });
    }
    update(id, body, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const bodyParse = this.parseHelper.removeUndefinedProperty(body);
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.processRepository, id, { inEntity: 'farmID', inUser: 'farmID' }, user);
            if (bodyParse.farmID) {
                AuthHelper_1.AuthHelper.authQuery(bodyParse.farmID, 'farmID', user);
            }
            return this.processService.update(id, bodyParse);
        });
    }
    delete(id, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.processRepository, id, { inEntity: 'farmID', inUser: 'farmID' }, user);
            return this.processService.delete(id);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get(),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      example order: {"createdAt": -1}, \n
                      example select: ["id", "name", "code", "productObjectsTotal"], \n
                      example where: {"farmID": "uuid example"} (need farmID to check auth owner farm) \n
                      example relations: ["steps", "steps.stepProperties", "productObjects"], \n
                      status: 0: 'activate', 1: 'deactivate'`,
    }),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.ProcessResponse)),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    routing_controllers_1.OnUndefined(errors_1.ProcessNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ProcessResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.QueryParams()),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.FullQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProcessController.prototype, "find", null);
tslib_1.__decorate([
    routing_controllers_1.Post(),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      fields optional: productObjectsTotal, code, quantity, isHaveStep, createdAt, updatedAt, deletedAt, status`,
    }),
    routing_controllers_1.OnUndefined(errors_1.ProcessNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ProcessResponse),
    tslib_1.__param(0, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.CreateProcessBody, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProcessController.prototype, "create", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/:id'),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      example select: ["id", "name", "code", "productObjectsTotal"], \n
                      example relations: ["steps", "steps.stepProperties"], \n
                      status: 0: 'activate', 1: 'deactivate'`,
    }),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.ProcessDetailResponse)),
    routing_controllers_1.OnUndefined(errors_1.ProcessNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ProcessDetailResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.BaseQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProcessController.prototype, "findOne", null);
tslib_1.__decorate([
    routing_controllers_1.Patch('/:id'),
    routing_controllers_1.OnUndefined(errors_1.ProcessNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ProcessResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.UpdateProcessBody, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProcessController.prototype, "update", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/:id'),
    routing_controllers_1.OnUndefined(errors_1.ProcessNotFoundError),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProcessController.prototype, "delete", null);
ProcessController = tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.JsonController('/processes'),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 401 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 404 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 500 }),
    tslib_1.__param(2, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__metadata("design:paramtypes", [services_1.ProcessService,
        common_1.ParseHelper,
        repositories_1.ProcessRepository])
], ProcessController);
exports.ProcessController = ProcessController;
//# sourceMappingURL=ProcessController.js.map