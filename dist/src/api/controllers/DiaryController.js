"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const services_1 = require("../services");
const models_1 = require("../models");
const errors_1 = require("../errors");
const interceptors_1 = require("../interceptors");
const responses_1 = require("./responses");
const requests_1 = require("./requests");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const common_1 = require("../services/common");
const AuthHelper_1 = require("../../auth/AuthHelper");
const repositories_1 = require("../repositories");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
let DiaryController = class DiaryController {
    constructor(diaryService, parseHelper, sectionRepository, stepRepository, diaryRepository, productObjectRepository) {
        this.diaryService = diaryService;
        this.parseHelper = parseHelper;
        this.sectionRepository = sectionRepository;
        this.stepRepository = stepRepository;
        this.diaryRepository = diaryRepository;
        this.productObjectRepository = productObjectRepository;
    }
    // example where: { "step": {"process": {"farmID": "uuid example"}}} (need farmID to check auth owner farm)
    find(query) {
        const queryParse = this.parseHelper.fullQueryParam(query);
        // AuthHelper.authQueryByWhereParam(queryParse.where, user, {inEntity: 'step.process.farmID', inUser: 'farmID'});
        return this.diaryService.find(queryParse);
    }
    create(body, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { productObjectID, sectionID, stepID } = body;
            if (sectionID) {
                yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.sectionRepository, sectionID, {
                    inEntity: 'process.farmID',
                    inUser: 'farmID',
                }, user, ['process']);
            }
            if (productObjectID) {
                yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.productObjectRepository, productObjectID, {
                    inEntity: 'product.farmID',
                    inUser: 'farmID',
                }, user, ['product']);
            }
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.stepRepository, stepID, {
                inEntity: 'process.farmID',
                inUser: 'farmID',
            }, user, ['process']);
            const diary = new models_1.Diary();
            lodash_1.default.assign(diary, body);
            return this.diaryService.create(diary, productObjectID);
        });
    }
    findOne(id, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParse = this.parseHelper.baseQueryParam(query);
            return yield this.diaryService.findOne(id, queryParse);
        });
    }
    update(id, body, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const bodyParse = this.parseHelper.removeUndefinedProperty(body);
            const awaiters = [];
            awaiters.push(AuthHelper_1.AuthHelper.authQueryNeedFinding(this.diaryRepository, id, {
                inEntity: 'section.process.farmID',
                inUser: 'farmID',
            }, user, ['section', 'section.process']));
            if (bodyParse.sectionID) {
                awaiters.push(AuthHelper_1.AuthHelper.authQueryNeedFinding(this.sectionRepository, bodyParse.sectionID, {
                    inEntity: 'process.farmID',
                    inUser: 'farmID',
                }, user, ['process']));
            }
            if (bodyParse.stepID) {
                awaiters.push(AuthHelper_1.AuthHelper.authQueryNeedFinding(this.stepRepository, bodyParse.stepID, {
                    inEntity: 'process.farmID',
                    inUser: 'farmID',
                }, user, ['process']));
            }
            yield Promise.all(awaiters);
            return this.diaryService.update(id, bodyParse);
        });
    }
    delete(id, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.diaryRepository, id, {
                inEntity: 'section.process.farmID',
                inUser: 'farmID',
            }, user, ['section', 'section.process']);
            return this.diaryService.delete(id);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get(),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      example order: {"createdAt": -1}, \n
                      example select: ["id", "name"], \n
                      example where: { "stepID": "uuid example", "sectionID": "uuid example" } \n`,
    }),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.DiaryResponse)),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    routing_controllers_1.OnUndefined(errors_1.DiaryNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.DiaryResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.QueryParams()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.FullQuery]),
    tslib_1.__metadata("design:returntype", Promise)
], DiaryController.prototype, "find", null);
tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Post(),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      fields optional: sectionID, productObjectID, description, urls, createdAt`,
    }),
    routing_controllers_1.OnUndefined(errors_1.DiaryNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.DiaryResponse),
    tslib_1.__param(0, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.CreateDiaryBody, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DiaryController.prototype, "create", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/:id'),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.DiaryResponse)),
    routing_controllers_1.OnUndefined(errors_1.DiaryNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.DiaryResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.BaseQuery]),
    tslib_1.__metadata("design:returntype", Promise)
], DiaryController.prototype, "findOne", null);
tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Patch('/:id'),
    routing_controllers_1.OnUndefined(errors_1.DiaryNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.DiaryResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.UpdateDiaryBody, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DiaryController.prototype, "update", null);
tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Delete('/:id'),
    routing_controllers_1.OnUndefined(errors_1.DiaryNotFoundError),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DiaryController.prototype, "delete", null);
DiaryController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/diaries'),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 401 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 404 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 500 }),
    tslib_1.__param(2, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(3, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(4, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(5, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__metadata("design:paramtypes", [services_1.DiaryService,
        common_1.ParseHelper,
        repositories_1.SectionRepository,
        repositories_1.StepRepository,
        repositories_1.DiaryRepository,
        repositories_1.ProductObjectRepository])
], DiaryController);
exports.DiaryController = DiaryController;
//# sourceMappingURL=DiaryController.js.map