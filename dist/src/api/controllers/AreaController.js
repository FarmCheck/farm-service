"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const services_1 = require("../services");
const models_1 = require("../models");
const errors_1 = require("../errors");
const interceptors_1 = require("../interceptors");
const requests_1 = require("./requests");
const responses_1 = require("./responses");
const common_1 = require("../services/common");
const AuthHelper_1 = require("../../auth/AuthHelper");
const repositories_1 = require("../repositories");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
let AreaController = class AreaController {
    constructor(areaService, parseHelper, areaRepository) {
        this.areaService = areaService;
        this.parseHelper = parseHelper;
        this.areaRepository = areaRepository;
    }
    find(query, user) {
        const queryParse = this.parseHelper.fullQueryParam(query);
        // AuthHelper.authQueryByWhereParam(queryParse.where, user, { inEntity: 'farmID', inUser: 'farmID' });
        return this.areaService.find(queryParse);
    }
    create(user, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            AuthHelper_1.AuthHelper.authQuery(body.farmID, 'farmID', user);
            const area = new models_1.Area();
            lodash_1.default.assign(area, body);
            return this.areaService.create(area, body.medias);
        });
    }
    findOne(id, query, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParse = this.parseHelper.baseQueryParam(query);
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.areaRepository, id, { inEntity: 'farmID', inUser: 'farmID' }, user);
            return yield this.areaService.findOne(id, queryParse);
        });
    }
    update(id, body, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const bodyParse = this.parseHelper.removeUndefinedProperty(body);
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.areaRepository, id, { inEntity: 'farmID', inUser: 'farmID' }, user);
            if (bodyParse.farmID) {
                AuthHelper_1.AuthHelper.authQuery(bodyParse.farmID, 'farmID', user);
            }
            return this.areaService.update(id, bodyParse);
        });
    }
    delete(id, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.areaRepository, id, {
                inEntity: 'farmID',
                inUser: 'farmID',
            }, user);
            return this.areaService.delete(id);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get(),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      example order: {"createdAt": -1}, \n
                      example select: ["id", "name", "code", "productObjectsTotal"], \n
                      example where: {"farmID": "uuid example"} (need farmID to check auth owner farm)\n
                      example relations: ["medias", "productObjects"], \n
                      type: 0: 'field area', 1: 'farming area', 2: 'production area', 3: 'field & product area', 4: 'field & production area', 5: 'others', \n
                      status: 0: 'activate', 1: 'deactivate', \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'`,
    }),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.AreaResponse)),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    routing_controllers_1.OnUndefined(errors_1.AreaNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.AreaResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.QueryParams()),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.FullQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AreaController.prototype, "find", null);
tslib_1.__decorate([
    routing_controllers_1.Post(),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      fields optional: employeeID, locationID, medias, code, type, description, address, latitude, longitude,
                      productObjectsTotal, createdAt, updatedAt, deletedAt, status \n
                      type: 0: 'field area', 1: 'farming area', 2: 'production area', 3: 'field & product area', 4: 'field & production area', 5: 'others', \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'`,
    }),
    routing_controllers_1.OnUndefined(errors_1.AreaNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.AreaResponse),
    tslib_1.__param(0, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__param(1, routing_controllers_1.Body({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, requests_1.CreateAreaBody]),
    tslib_1.__metadata("design:returntype", Promise)
], AreaController.prototype, "create", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/:id'),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      example select: ["id", "name", "code", "productObjectsTotal"], \n
                      example relations: ["medias", "farm", "location", "employee"], \n
                      type: 0: 'field area', 1: 'farming area', 2: 'production area', 3: 'field & product area', 4: 'field & production area', 5: 'others', \n
                      status: 0: 'activate', 1: 'deactivate', \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'`,
    }),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.AreaDetailResponse)),
    routing_controllers_1.OnUndefined(errors_1.AreaNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.AreaDetailResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.BaseQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AreaController.prototype, "findOne", null);
tslib_1.__decorate([
    routing_controllers_1.Patch('/:id'),
    routing_controllers_1.OnUndefined(errors_1.AreaNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.AreaResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.UpdateAreaBody, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AreaController.prototype, "update", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/:id'),
    routing_controllers_1.OnUndefined(errors_1.AreaNotFoundError),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AreaController.prototype, "delete", null);
AreaController = tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.JsonController('/areas'),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 401 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 404 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 500 }),
    tslib_1.__param(2, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__metadata("design:paramtypes", [services_1.AreaService,
        common_1.ParseHelper,
        repositories_1.AreaRepository])
], AreaController);
exports.AreaController = AreaController;
//# sourceMappingURL=AreaController.js.map