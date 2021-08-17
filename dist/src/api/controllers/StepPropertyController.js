"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepPropertyController = void 0;
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
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const repositories_1 = require("../repositories");
const AuthHelper_1 = require("../../auth/AuthHelper");
let StepPropertyController = class StepPropertyController {
    constructor(stepPropertyService, parseHelper, stepRepository, stepPropertyRepository) {
        this.stepPropertyService = stepPropertyService;
        this.parseHelper = parseHelper;
        this.stepRepository = stepRepository;
        this.stepPropertyRepository = stepPropertyRepository;
    }
    find(query, user) {
        const queryParse = this.parseHelper.fullQueryParam(query);
        AuthHelper_1.AuthHelper.authQueryByWhereParam(queryParse.where, user, { inEntity: 'step.process.farmID', inUser: 'farmID' });
        return this.stepPropertyService.find(queryParse);
    }
    create(body, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.stepRepository, body.stepID, {
                inEntity: 'process.farmID',
                inUser: 'farmID',
            }, user, ['process']);
            const stepProperty = new models_1.StepProperty();
            lodash_1.default.assign(stepProperty, body);
            return this.stepPropertyService.create(stepProperty);
        });
    }
    findOne(id, query, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.stepPropertyRepository, id, { inEntity: 'step.process.farmID', inUser: 'farmID' }, user, ['step', 'step.process']);
            const queryParse = this.parseHelper.baseQueryParam(query);
            return yield this.stepPropertyService.findOne(id, queryParse);
        });
    }
    update(id, body, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const bodyParse = this.parseHelper.removeUndefinedProperty(body);
            const awaiters = [];
            awaiters.push(AuthHelper_1.AuthHelper.authQueryNeedFinding(this.stepPropertyRepository, id, { inEntity: 'step.process.farmID', inUser: 'farmID' }, user, ['step', 'step.process']));
            if (bodyParse.stepID) {
                awaiters.push(AuthHelper_1.AuthHelper.authQueryNeedFinding(this.stepRepository, bodyParse.stepID, { inEntity: 'process.farmID', inUser: 'farmID' }, user, ['process']));
            }
            yield Promise.all(awaiters);
            return this.stepPropertyService.update(id, bodyParse);
        });
    }
    delete(id, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.stepPropertyRepository, id, { inEntity: 'step.process.farmID', inUser: 'farmID' }, user, ['step', 'step.process']);
            return this.stepPropertyService.delete(id);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get(),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      example order: {"name": -1}, \n
                      example select: ["id", "name"], \n
                      example where: {"step": {"process": {"farmID": "uuid example"}}, "stepID": "uuid example"} (need farmID to check auth owner farm) \n`,
    }),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.StepPropertyResponse)),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    routing_controllers_1.OnUndefined(errors_1.StepPropertyNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.StepPropertyResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.QueryParams()),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.FullQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StepPropertyController.prototype, "find", null);
tslib_1.__decorate([
    routing_controllers_1.Post(),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      fields optional: isRequired, type`,
    }),
    routing_controllers_1.OnUndefined(errors_1.StepPropertyNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.StepPropertyResponse),
    tslib_1.__param(0, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [responses_1.BaseStepProperty, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StepPropertyController.prototype, "create", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/:id'),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.StepPropertyResponse)),
    routing_controllers_1.OnUndefined(errors_1.StepPropertyNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.StepPropertyResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.BaseQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StepPropertyController.prototype, "findOne", null);
tslib_1.__decorate([
    routing_controllers_1.Patch('/:id'),
    routing_controllers_1.OnUndefined(errors_1.StepPropertyNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.StepPropertyResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.UpdateStepPropertyBody, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StepPropertyController.prototype, "update", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/:id'),
    routing_controllers_1.OnUndefined(errors_1.StepPropertyNotFoundError),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StepPropertyController.prototype, "delete", null);
StepPropertyController = tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.JsonController('/step-properties'),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 401 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 404 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 500 }),
    tslib_1.__param(2, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(3, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__metadata("design:paramtypes", [services_1.StepPropertyService,
        common_1.ParseHelper,
        repositories_1.StepRepository,
        repositories_1.StepPropertyRepository])
], StepPropertyController);
exports.StepPropertyController = StepPropertyController;
//# sourceMappingURL=StepPropertyController.js.map