"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepController = void 0;
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
let StepController = class StepController {
    constructor(stepService, parseHelper, processRepository, stepRepository) {
        this.stepService = stepService;
        this.parseHelper = parseHelper;
        this.processRepository = processRepository;
        this.stepRepository = stepRepository;
    }
    find(query, user) {
        const queryParse = this.parseHelper.fullQueryParam(query);
        AuthHelper_1.AuthHelper.authQueryByWhereParam(queryParse.where, user, { inEntity: 'process.farmID', inUser: 'farmID' });
        return this.stepService.find(queryParse);
    }
    create(body, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.processRepository, body.processID, { inEntity: 'farmID', inUser: 'farmID' }, user);
            const step = new models_1.Step();
            lodash_1.default.assign(step, body);
            return this.stepService.create(step, body.stepProperties);
        });
    }
    findOne(id, query, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.stepRepository, id, { inEntity: 'process.farmID', inUser: 'farmID' }, user, ['process']);
            const queryParse = this.parseHelper.baseQueryParam(query);
            return yield this.stepService.findOne(id, queryParse);
        });
    }
    update(id, body, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const bodyParse = this.parseHelper.removeUndefinedProperty(body);
            const awaiters = [];
            awaiters.push(AuthHelper_1.AuthHelper.authQueryNeedFinding(this.stepRepository, id, { inEntity: 'process.farmID', inUser: 'farmID' }, user, ['process']));
            if (bodyParse.processID) {
                awaiters.push(AuthHelper_1.AuthHelper.authQueryNeedFinding(this.processRepository, bodyParse.processID, { inEntity: 'farmID', inUser: 'farmID' }, user));
            }
            yield Promise.all(awaiters);
            return this.stepService.update(id, bodyParse);
        });
    }
    delete(id, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.stepRepository, id, { inEntity: 'process.farmID', inUser: 'farmID' }, user, ['process']);
            return this.stepService.delete(id);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get(),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      example order: {"createdAt": -1}, \n
                      example select: ["id", "name"], \n
                      example where: { "process": {"farmID": "uuid example"}, "processID": "uuid example"} (need farmID to check auth owner farm) \n`,
    }),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.StepResponse)),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    routing_controllers_1.OnUndefined(errors_1.StepNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.StepResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.QueryParams()),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.FullQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StepController.prototype, "find", null);
tslib_1.__decorate([
    routing_controllers_1.Post(),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      fields optional: isInternal, description \n
                      type of step property: 0: 'text', 1: 'number', 2: 'link'`,
    }),
    routing_controllers_1.OnUndefined(errors_1.StepNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.StepResponse),
    tslib_1.__param(0, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.CreateStepBody, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StepController.prototype, "create", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/:id'),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.StepResponse)),
    routing_controllers_1.OnUndefined(errors_1.StepNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.StepResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.BaseQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StepController.prototype, "findOne", null);
tslib_1.__decorate([
    routing_controllers_1.Patch('/:id'),
    routing_controllers_1.OnUndefined(errors_1.StepNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.StepResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.UpdateStepBody, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StepController.prototype, "update", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/:id'),
    routing_controllers_1.OnUndefined(errors_1.StepNotFoundError),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StepController.prototype, "delete", null);
StepController = tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.JsonController('/steps'),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 401 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 404 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 500 }),
    tslib_1.__param(2, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(3, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__metadata("design:paramtypes", [services_1.StepService,
        common_1.ParseHelper,
        repositories_1.ProcessRepository,
        repositories_1.StepRepository])
], StepController);
exports.StepController = StepController;
//# sourceMappingURL=StepController.js.map