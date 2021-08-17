"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaAbleController = void 0;
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
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const repositories_1 = require("../repositories");
let MediaAbleController = class MediaAbleController {
    constructor(mediaAbleService, parseHelper, farmRepository, productRepository, areaRepository, productObjectRepository, mediaAbleRepository) {
        this.mediaAbleService = mediaAbleService;
        this.parseHelper = parseHelper;
        this.farmRepository = farmRepository;
        this.productRepository = productRepository;
        this.areaRepository = areaRepository;
        this.productObjectRepository = productObjectRepository;
        this.mediaAbleRepository = mediaAbleRepository;
    }
    find(targetType, query, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParse = this.parseHelper.fullQueryParam(query);
            yield this.authQueryWhereParam(queryParse.where, user, targetType);
            return this.mediaAbleService.find(queryParse);
        });
    }
    create(body, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.authQueryWhereParam({ targetID: body.targetID }, user, body.targetType);
            const mediaAble = new models_1.MediaAble();
            lodash_1.default.assign(mediaAble, body);
            return this.mediaAbleService.create(mediaAble);
        });
    }
    findOne(id, query, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.authEntityByID(id, user);
            const queryParse = this.parseHelper.baseQueryParam(query);
            return yield this.mediaAbleService.findOne(id, queryParse);
        });
    }
    update(id, body, targetType, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const bodyParse = this.parseHelper.removeUndefinedProperty(body);
            const awaiters = [];
            awaiters.push(this.authEntityByID(id, user));
            if (bodyParse.targetID) {
                awaiters.push(this.authQueryWhereParam({ targetID: bodyParse.targetID }, user, targetType));
            }
            yield Promise.all(awaiters);
            return this.mediaAbleService.update(id, bodyParse);
        });
    }
    delete(id, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.authEntityByID(id, user);
            return this.mediaAbleService.delete(id);
        });
    }
    authEntityByID(id, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const certAble = yield this.mediaAbleRepository.findOne(id, { relations: ['targetType'] });
            if (!certAble) {
                throw new routing_controllers_1.HttpError(403, 'Forbidden');
            }
            let repository = undefined;
            let compareField = { inEntity: '', inUser: '' };
            let relations = [];
            switch (certAble.targetType.name) {
                case 'farm':
                    repository = this.farmRepository;
                    compareField = { inEntity: 'userID', inUser: 'sub' };
                    break;
                case 'product':
                    repository = this.productRepository;
                    compareField = { inEntity: 'farmID', inUser: 'farmID' };
                    break;
                case 'area':
                    repository = this.areaRepository;
                    compareField = { inEntity: 'farmID', inUser: 'farmID' };
                    break;
                case 'product_object':
                    repository = this.productObjectRepository;
                    compareField = { inEntity: 'process.farmID', inUser: 'farmID' };
                    relations = ['process'];
                    break;
                default:
                    repository = undefined;
            }
            if (!repository) {
                throw new routing_controllers_1.HttpError(500, 'target type in DB is invalid');
            }
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(repository, certAble.targetID, compareField, user, relations);
        });
    }
    authQueryWhereParam(where, user, targetType) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let repository = undefined;
            let compareField = { idField: 'targetID', inEntity: '', inUser: '' };
            let relations = [];
            switch (targetType) {
                case 'farm':
                    repository = this.farmRepository;
                    compareField = { idField: 'targetID', inEntity: 'userID', inUser: 'sub' };
                    break;
                case 'product':
                    repository = this.productRepository;
                    compareField = { idField: 'targetID', inEntity: 'farmID', inUser: 'farmID' };
                    break;
                case 'area':
                    repository = this.areaRepository;
                    compareField = { idField: 'targetID', inEntity: 'farmID', inUser: 'farmID' };
                    break;
                case 'product_object':
                    repository = this.productObjectRepository;
                    compareField = { idField: 'targetID', inEntity: 'process.farmID', inUser: 'farmID' };
                    relations = ['process'];
                    break;
                default:
                    repository = undefined;
            }
            if (!repository) {
                throw new routing_controllers_1.HttpError(400, 'target type is invalid');
            }
            yield AuthHelper_1.AuthHelper.authQueryByWhereParamNeedFinding(repository, where, compareField, user, relations);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get(),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      example order: {"createdAt": -1}, \n
                      example select: ["id", "targetID"]`,
    }),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.MediaAbleResponse)),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    routing_controllers_1.OnUndefined(errors_1.MediaAbleNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.MediaAbleResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.QueryParam('targetType', { required: true })),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.FullQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaAbleController.prototype, "find", null);
tslib_1.__decorate([
    routing_controllers_1.Post(),
    routing_controllers_1.OnUndefined(errors_1.MediaAbleNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.MediaAbleResponse),
    tslib_1.__param(0, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.CreateMediaAbleBody, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaAbleController.prototype, "create", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/:id'),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.MediaAbleResponse)),
    routing_controllers_1.OnUndefined(errors_1.MediaAbleNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.MediaAbleResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.BaseQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaAbleController.prototype, "findOne", null);
tslib_1.__decorate([
    routing_controllers_1.Patch('/:id'),
    routing_controllers_1.OnUndefined(errors_1.MediaAbleNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.MediaAbleResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(2, routing_controllers_1.QueryParam('targetType', { required: true })),
    tslib_1.__param(3, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.UpdateMediaAbleBody, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaAbleController.prototype, "update", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/:id'),
    routing_controllers_1.OnUndefined(errors_1.MediaAbleNotFoundError),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaAbleController.prototype, "delete", null);
MediaAbleController = tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.JsonController('/media-ables'),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 401 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 404 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 500 }),
    tslib_1.__param(2, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(3, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(4, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(5, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(6, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__metadata("design:paramtypes", [services_1.MediaAbleService,
        common_1.ParseHelper,
        repositories_1.FarmRepository,
        repositories_1.ProductRepository,
        repositories_1.AreaRepository,
        repositories_1.ProductObjectRepository,
        repositories_1.MediaAbleRepository])
], MediaAbleController);
exports.MediaAbleController = MediaAbleController;
//# sourceMappingURL=MediaAbleController.js.map