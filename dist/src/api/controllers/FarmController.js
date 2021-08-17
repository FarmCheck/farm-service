"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmController = void 0;
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
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var FarmQueryType;
(function (FarmQueryType) {
    FarmQueryType[FarmQueryType["default"] = 0] = "default";
    FarmQueryType[FarmQueryType["dashboard"] = 1] = "dashboard";
})(FarmQueryType || (FarmQueryType = {}));
class FarmQuery extends requests_1.BaseQuery {
    constructor() {
        super(...arguments);
        this.type = FarmQueryType.default;
    }
}
tslib_1.__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsIn([
        FarmQueryType.default,
        FarmQueryType.dashboard,
    ]),
    tslib_1.__metadata("design:type", Number)
], FarmQuery.prototype, "type", void 0);
let FarmController = class FarmController {
    constructor(farmService, parseHelper, farmRepository) {
        this.farmService = farmService;
        this.parseHelper = parseHelper;
        this.farmRepository = farmRepository;
    }
    find(query, user) {
        const queryParse = this.parseHelper.fullQueryParam(query);
        AuthHelper_1.AuthHelper.authQueryByWhereParam(queryParse.where, user, { inEntity: 'userID', inUser: 'sub' });
        return this.farmService.find(queryParse);
    }
    create(body, req, user) {
        AuthHelper_1.AuthHelper.authQuery(body.userID, 'sub', user);
        const farm = new models_1.Farm();
        lodash_1.default.assign(farm, body);
        const token = `${req.headers['token-id']}`;
        return this.farmService.create(farm, body.medias, token);
    }
    findOne(id, query, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParse = this.parseHelper.baseQueryParam(query);
            const { type } = queryParse;
            const transformOptions = {
                strategy: 'excludeAll',
                exposeUnsetFields: false,
            };
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.farmRepository, id, { inEntity: 'userID', inUser: 'sub' }, user);
            if (type === FarmQueryType.dashboard) {
                const response = yield this.farmService.findOneDashboard(id, queryParse);
                return class_transformer_1.plainToClass(responses_1.FarmDashBoardResponse, response, transformOptions);
            }
            else {
                const farm = yield this.farmService.findOne(id, queryParse);
                return class_transformer_1.plainToClass(responses_1.FarmDetailResponse, farm, transformOptions);
            }
        });
    }
    findProducts(id, query, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.farmRepository, id, { inEntity: 'userID', inUser: 'sub' }, user);
            const queryParse = this.parseHelper.baseQueryParam(query);
            return yield this.farmService.getProducts(id, queryParse);
        });
    }
    findAreas(id, query, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.farmRepository, id, { inEntity: 'userID', inUser: 'sub' }, user);
            const queryParse = this.parseHelper.baseQueryParam(query);
            return this.farmService.getAreas(id, queryParse);
        });
    }
    findProductObjects(id, query, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.farmRepository, id, { inEntity: 'userID', inUser: 'sub' }, user);
            const queryParse = this.parseHelper.baseQueryParam(query);
            return this.farmService.getProductObjects(id, queryParse);
        });
    }
    findProcesses(id, query, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.farmRepository, id, { inEntity: 'userID', inUser: 'sub' }, user);
            const queryParse = this.parseHelper.baseQueryParam(query);
            return this.farmService.getProcesses(id, queryParse);
        });
    }
    update(id, body, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const bodyParse = this.parseHelper.removeUndefinedProperty(body);
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.farmRepository, id, { inEntity: 'userID', inUser: 'sub' }, user);
            if (bodyParse.userID) {
                AuthHelper_1.AuthHelper.authQuery(bodyParse.userID, 'sub', user);
            }
            return this.farmService.update(id, bodyParse);
        });
    }
    delete(id, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(this.farmRepository, id, { inEntity: 'userID', inUser: 'sub' }, user);
            return this.farmService.delete(id);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get(),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      example order: {"createdAt": -1}, \n
                      example select: ["id", "name", "code", "productsTotal"], \n
                      example where: {"userID": "uuid example"} (need userID to check auth owner farm) \n
                      example relations: ["medias", "location"], \n
                      status: 0: 'activate', 1: 'deactivate', 2: 'pause', 3: 'draft' \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'`,
    }),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.FarmResponse)),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    routing_controllers_1.OnUndefined(errors_1.FarmNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.FarmResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.QueryParams()),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.FullQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FarmController.prototype, "find", null);
tslib_1.__decorate([
    routing_controllers_1.Post(),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      fields optional: productsTotal, locationID, medias, code, description, isVerifiedPhoneNumber, isVerifiedEmail, website,
                      logo, banner, address, latitude, longitude, status, createdAt, updatedAt, deletedAt \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'`,
    }),
    routing_controllers_1.OnUndefined(errors_1.FarmNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.FarmResponse),
    tslib_1.__param(0, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(1, routing_controllers_1.Req()),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.CreateFarmBody, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FarmController.prototype, "create", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/:id'),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      example select: ["id", "name", "code", "productsTotal"], \n
                      example relations: ["certificationAbles", "certificationAbles.organization", "certificationAbles.certification", "medias", "location"], \n
                      status: 0: 'activate', 1: 'deactivate', 2: 'pause', 3: 'draft' \n
                      type of media: 0: 'image', 1: 'video', 2: 'document'`,
    }),
    routing_controllers_1.OnUndefined(errors_1.FarmNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.FarmDetailResponse, { description: 'default' }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.FarmDashBoardResponse, { description: 'dashboard' }),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, FarmQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FarmController.prototype, "findOne", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/:id/products'),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.ProductResponse)),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    routing_controllers_1.OnUndefined(errors_1.FarmNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ProductResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.FullQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FarmController.prototype, "findProducts", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/:id/areas'),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.AreaResponse)),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    routing_controllers_1.OnUndefined(errors_1.FarmNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.AreaResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.FullQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FarmController.prototype, "findAreas", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/:id/product-objects'),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.ProductObjectResponse)),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    routing_controllers_1.OnUndefined(errors_1.FarmNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ProductObjectResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.FullQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FarmController.prototype, "findProductObjects", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/:id/processes'),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.ProcessResponse)),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    routing_controllers_1.OnUndefined(errors_1.FarmNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ProcessResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.FullQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FarmController.prototype, "findProcesses", null);
tslib_1.__decorate([
    routing_controllers_1.Patch('/:id'),
    routing_controllers_1.OnUndefined(errors_1.FarmNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.FarmResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.UpdateFarmBody, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FarmController.prototype, "update", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/:id'),
    routing_controllers_1.OnUndefined(errors_1.FarmNotFoundError),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FarmController.prototype, "delete", null);
FarmController = tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.JsonController('/farms'),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 401 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 404 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 500 }),
    tslib_1.__param(2, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__metadata("design:paramtypes", [services_1.FarmService,
        common_1.ParseHelper,
        repositories_1.FarmRepository])
], FarmController);
exports.FarmController = FarmController;
//# sourceMappingURL=FarmController.js.map