"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionController = void 0;
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
const class_transformer_1 = require("class-transformer");
const common_1 = require("../services/common");
const interceptors_2 = require("../interceptors");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const repositories_1 = require("../repositories");
const AuthHelper_1 = require("../../auth/AuthHelper");
const PortalResponse_1 = require("./responses/PortalResponse");
let SectionController = class SectionController {
    constructor(sectionService, parseHelper, productObjectRepository, processRepository, areaRepository, sectionRepository) {
        this.sectionService = sectionService;
        this.parseHelper = parseHelper;
        this.productObjectRepository = productObjectRepository;
        this.processRepository = processRepository;
        this.areaRepository = areaRepository;
        this.sectionRepository = sectionRepository;
    }
    find(query, user) {
        const queryParse = this.parseHelper.fullQueryParam(query);
        // AuthHelper.authQueryByWhereParam(queryParse.where, user, { inEntity: 'process.farmID', inUser: 'farmID' });
        return this.sectionService.find(queryParse);
    }
    create(body, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                AuthHelper_1.AuthHelper.authQueryNeedFinding(this.productObjectRepository, body.productObjectID, { inEntity: 'area.farmID', inUser: 'farmID' }, user, ['area']),
                AuthHelper_1.AuthHelper.authQueryNeedFinding(this.processRepository, body.processID, { inEntity: 'farmID', inUser: 'farmID' }, user),
                AuthHelper_1.AuthHelper.authQueryNeedFinding(this.areaRepository, body.areaID, { inEntity: 'farmID', inUser: 'farmID' }, user),
            ]);
            const section = new models_1.Section();
            lodash_1.default.assign(section, body);
            return this.sectionService.create(section);
        });
    }
    findOne(id, query, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.sectionRepository, id, { inEntity: 'area.farmID', inUser: 'farmID' }, user, ['area']);
            const queryParse = this.parseHelper.baseQueryParam(query);
            return yield this.sectionService.findOne(id, queryParse);
        });
    }
    findDiaries(id, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.sectionRepository, id, {
                inEntity: 'area.farmID',
                inUser: 'farmID',
            }, user, ['area']);
            return yield this.sectionService.findStepsWithDiaries(id);
        });
    }
    recheckDiaries(sectionID, stepID, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // await AuthHelper.authQueryNeedFinding(this.sectionRepository, sectionID, {inEntity: 'area.farmID', inUser: 'farmID'}, user, ['area']);
            const { list, count } = yield this.sectionService.recheckDiariesByStep(sectionID, stepID, query);
            const resList = list.map(diary => class_transformer_1.plainToClass(responses_1.DiaryBaseResponse, diary));
            return {
                list: resList,
                count,
            };
        });
    }
    update(id, body, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const bodyParse = this.parseHelper.removeUndefinedProperty(body);
            const awaiters = [];
            awaiters.push(AuthHelper_1.AuthHelper.authQueryNeedFinding(this.sectionRepository, id, { inEntity: 'area.farmID', inUser: 'farmID' }, user, ['area']));
            if (bodyParse.productObjectID) {
                awaiters.push(AuthHelper_1.AuthHelper.authQueryNeedFinding(this.productObjectRepository, bodyParse.productObjectID, { inEntity: 'area.farmID', inUser: 'farmID' }, user, ['area']));
            }
            if (bodyParse.processID) {
                awaiters.push(AuthHelper_1.AuthHelper.authQueryNeedFinding(this.processRepository, bodyParse.processID, { inEntity: 'farmID', inUser: 'farmID' }, user));
            }
            if (bodyParse.areaID) {
                awaiters.push(AuthHelper_1.AuthHelper.authQueryNeedFinding(this.areaRepository, bodyParse.areaID, { inEntity: 'farmID', inUser: 'farmID' }, user));
            }
            yield Promise.all(awaiters);
            return this.sectionService.update(id, bodyParse);
        });
    }
    delete(id, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.sectionRepository, id, { inEntity: 'area.farmID', inUser: 'farmID' }, user, ['area']);
            return this.sectionService.delete(id);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get(),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      example order: {"createdAt": -1}, \n
                      example select: ["id", "name", "code"], \n
                      example where: { "process": {"farmID": "uuid example"}, "productObjectID": "uuid example"} (need farmID to check auth owner farm), \n
                      status: 0: 'activate', 1: 'deactivate' \n`,
    }),
    routing_controllers_1.UseInterceptor(interceptors_2.ClassTransformerInterceptor(responses_1.SectionResponse)),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    routing_controllers_1.OnUndefined(errors_1.SectionNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.SectionResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.QueryParams()),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.FullQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SectionController.prototype, "find", null);
tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Post(),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      fields optional: status, type, createdAt`,
    }),
    routing_controllers_1.OnUndefined(errors_1.SectionNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.SectionResponse),
    tslib_1.__param(0, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.CreateSectionBody, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SectionController.prototype, "create", null);
tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get('/:id'),
    routing_controllers_1.UseInterceptor(interceptors_2.ClassTransformerInterceptor(responses_1.SectionDetailResponse)),
    routing_controllers_1.OnUndefined(errors_1.SectionNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.SectionDetailResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.BaseQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SectionController.prototype, "findOne", null);
tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get('/:id/diaries'),
    interceptors_2.ClassTransformerInterceptor(PortalResponse_1.DiariesPortalResponse),
    routing_controllers_1.OnUndefined(errors_1.SectionNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(PortalResponse_1.DiariesPortalResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SectionController.prototype, "findDiaries", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/:id/check/:stepID/diaries'),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    routing_controllers_1.OnUndefined(errors_1.SectionNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.DiaryBaseResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.Param('stepID')),
    tslib_1.__param(2, routing_controllers_1.QueryParams()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, requests_1.FullQuery]),
    tslib_1.__metadata("design:returntype", Promise)
], SectionController.prototype, "recheckDiaries", null);
tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Patch('/:id'),
    routing_controllers_1.OnUndefined(errors_1.SectionNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.SectionResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.UpdateSectionBody, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SectionController.prototype, "update", null);
tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Delete('/:id'),
    routing_controllers_1.OnUndefined(errors_1.SectionNotFoundError),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SectionController.prototype, "delete", null);
SectionController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/sections'),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 401 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 404 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 500 }),
    tslib_1.__param(2, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(3, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(4, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(5, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__metadata("design:paramtypes", [services_1.SectionService,
        common_1.ParseHelper,
        repositories_1.ProductObjectRepository,
        repositories_1.ProcessRepository,
        repositories_1.AreaRepository,
        repositories_1.SectionRepository])
], SectionController);
exports.SectionController = SectionController;
//# sourceMappingURL=SectionController.js.map