"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = void 0;
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
const AuthHelper_1 = require("../../auth/AuthHelper");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const repositories_1 = require("../repositories");
let MediaController = class MediaController {
    constructor(areaImageService, parseHelper, farmRepository, productRepository, areaRepository, productObjectRepository, mediaAbleRepository, targetTypeRepository) {
        this.areaImageService = areaImageService;
        this.parseHelper = parseHelper;
        this.farmRepository = farmRepository;
        this.productRepository = productRepository;
        this.areaRepository = areaRepository;
        this.productObjectRepository = productObjectRepository;
        this.mediaAbleRepository = mediaAbleRepository;
        this.targetTypeRepository = targetTypeRepository;
    }
    find(query) {
        const queryParse = this.parseHelper.fullQueryParam(query);
        return this.areaImageService.find(queryParse);
    }
    create(body, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.authQueryWhereParam({ targetID: body.targetID }, user, body.targetType);
            const areaImage = new models_1.Media();
            lodash_1.default.assign(areaImage, body);
            return this.areaImageService.create(areaImage, body.targetID, body.targetType);
        });
    }
    findOne(id, query, targetType, targetID, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.authEntityByID(id, user, targetID, targetType);
            const queryParse = this.parseHelper.baseQueryParam(query);
            return yield this.areaImageService.findOne(id, queryParse);
        });
    }
    update(id, body, targetType, targetID, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const bodyParse = this.parseHelper.removeUndefinedProperty(body);
            yield this.authEntityByID(id, user, targetID, targetType);
            return this.areaImageService.update(id, bodyParse);
        });
    }
    delete(id, targetType, targetID, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.authEntityByID(id, user, targetID, targetType);
            return this.areaImageService.delete(id);
        });
    }
    authEntityByID(id, user, targetID, targetType) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const targetTypeEntity = yield this.targetTypeRepository.findOne({ name: targetType });
            if (!targetType) {
                throw new routing_controllers_1.HttpError(400, 'targetType is invalid');
            }
            const certAble = yield this.mediaAbleRepository.findOne({
                where: {
                    targetID,
                    mediaID: id,
                    targetTypeID: targetTypeEntity.id,
                },
            });
            if (!certAble) {
                throw new routing_controllers_1.HttpError(403, 'Forbidden');
            }
            let repository = undefined;
            let compareField = { inEntity: '', inUser: '' };
            let relations = [];
            switch (targetType) {
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
                throw new routing_controllers_1.HttpError(400, 'targetType is invalid');
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
    routing_controllers_1.UseBefore(middlewares_1.CheckRoleFuncMiddleware(CheckRoleFuncMiddleware_1.UserRoles.admin)),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.MediaResponse)),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    routing_controllers_1.OnUndefined(errors_1.MediaNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.MediaResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.QueryParams()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.FullQuery]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "find", null);
tslib_1.__decorate([
    routing_controllers_1.Post(),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      fields optional: createdAt`,
    }),
    routing_controllers_1.OnUndefined(errors_1.MediaNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.MediaResponse),
    tslib_1.__param(0, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.CreateMediaBody, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "create", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/:id'),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.MediaResponse)),
    routing_controllers_1.OnUndefined(errors_1.MediaNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.MediaResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__param(2, routing_controllers_1.QueryParam('targetType', { required: true })),
    tslib_1.__param(3, routing_controllers_1.QueryParam('targetID', { required: true })),
    tslib_1.__param(4, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.BaseQuery, String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "findOne", null);
tslib_1.__decorate([
    routing_controllers_1.Patch('/:id'),
    routing_controllers_1.OnUndefined(errors_1.MediaNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.MediaResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(2, routing_controllers_1.QueryParam('targetType', { required: true })),
    tslib_1.__param(3, routing_controllers_1.QueryParam('targetID', { required: true })),
    tslib_1.__param(4, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.UpdateMediaBody, String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "update", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/:id'),
    routing_controllers_1.OnUndefined(errors_1.MediaNotFoundError),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParam('targetType', { required: true })),
    tslib_1.__param(2, routing_controllers_1.QueryParam('targetID', { required: true })),
    tslib_1.__param(3, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "delete", null);
MediaController = tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.JsonController('/medias'),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 401 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 404 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 500 }),
    tslib_1.__param(2, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(3, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(4, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(5, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(6, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(7, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__metadata("design:paramtypes", [services_1.MediaService,
        common_1.ParseHelper,
        repositories_1.FarmRepository,
        repositories_1.ProductRepository,
        repositories_1.AreaRepository,
        repositories_1.ProductObjectRepository,
        repositories_1.MediaAbleRepository,
        repositories_1.TargetTypeRepository])
], MediaController);
exports.MediaController = MediaController;
//# sourceMappingURL=MediaController.js.map