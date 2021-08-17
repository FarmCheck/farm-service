"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificationAbleController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const models_1 = require("../models");
const services_1 = require("../services");
const errors_1 = require("../errors");
const interceptors_1 = require("../interceptors");
const responses_1 = require("./responses");
const requests_1 = require("./requests");
const common_1 = require("../services/common");
const AuthHelper_1 = require("../../auth/AuthHelper");
const repositories_1 = require("../repositories");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
let CertificationAbleController = class CertificationAbleController {
    constructor(certificationAbleService, parseHelper, farmRepository, productRepository, certificationAbleRepository) {
        this.certificationAbleService = certificationAbleService;
        this.parseHelper = parseHelper;
        this.farmRepository = farmRepository;
        this.productRepository = productRepository;
        this.certificationAbleRepository = certificationAbleRepository;
    }
    find(query, targetType, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queryParse = this.parseHelper.fullQueryParam(query);
            yield this.authQueryWhereParam(queryParse.where, user, targetType);
            return this.certificationAbleService.find(queryParse);
        });
    }
    create(body, targetType, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.authQueryWhereParam({ targetID: body.targetID }, user, targetType);
            const certificationAble = new models_1.CertificationAble();
            lodash_1.default.assign(certificationAble, body);
            return this.certificationAbleService.create(certificationAble, body.targetType);
        });
    }
    findOne(id, query, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.authEntityByID(id, user);
            const queryParse = this.parseHelper.baseQueryParam(query);
            return yield this.certificationAbleService.findOne(id, queryParse);
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
            return this.certificationAbleService.update(id, bodyParse);
        });
    }
    delete(id, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.authEntityByID(id, user);
            return this.certificationAbleService.delete(id);
        });
    }
    authEntityByID(id, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const certAble = yield this.certificationAbleRepository.findOne(id, { relations: ['targetType'] });
            if (!certAble) {
                throw new routing_controllers_1.HttpError(403, 'Forbidden');
            }
            let repository = undefined;
            let compareField = { inEntity: '', inUser: '' };
            switch (certAble.targetType.name) {
                case 'farm':
                    repository = this.farmRepository;
                    compareField = { inEntity: 'userID', inUser: 'sub' };
                    break;
                case 'product':
                    repository = this.productRepository;
                    compareField = { inEntity: 'farmID', inUser: 'farmID' };
                    break;
                default:
                    repository = undefined;
            }
            if (!repository) {
                throw new routing_controllers_1.HttpError(500, 'target type in DB is invalid');
            }
            yield AuthHelper_1.AuthHelper.authQueryNeedFinding(repository, certAble.targetID, compareField, user);
        });
    }
    authQueryWhereParam(where, user, targetType) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let repository = undefined;
            let compareField = { idField: 'targetID', inEntity: '', inUser: '' };
            switch (targetType) {
                case 'farm':
                    repository = this.farmRepository;
                    compareField = { idField: 'targetID', inEntity: 'userID', inUser: 'sub' };
                    break;
                case 'product':
                    repository = this.productRepository;
                    compareField = { idField: 'targetID', inEntity: 'farmID', inUser: 'farmID' };
                    break;
                default:
                    repository = undefined;
            }
            if (!repository) {
                throw new routing_controllers_1.HttpError(400, 'target type is invalid');
            }
            yield AuthHelper_1.AuthHelper.authQueryByWhereParamNeedFinding(repository, where, compareField, user);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get(),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      example order: {"createdAt": -1}, \n
                      example select: ["id", "targetID"], \n
                      example relations: ["certification", "organization"]`,
    }),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.CertificationAbleResponse)),
    routing_controllers_1.UseInterceptor(interceptors_1.ListResponseInterceptor),
    routing_controllers_1.OnUndefined(errors_1.CertificationAbleNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.CertificationAbleResponse, { isArray: true }),
    tslib_1.__param(0, routing_controllers_1.QueryParams()),
    tslib_1.__param(1, routing_controllers_1.QueryParam('targetType', { required: true })),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.FullQuery, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CertificationAbleController.prototype, "find", null);
tslib_1.__decorate([
    routing_controllers_1.Post(),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      fields optional: organizationID, targetTypeID, description, createdAt, effectiveAt, urls \n
                      target type: product || farm \n
                      effectiveAt: default 1 month later`,
    }),
    routing_controllers_1.OnUndefined(errors_1.CertificationAbleNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.CertificationAbleResponse),
    tslib_1.__param(0, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(1, routing_controllers_1.QueryParam('targetType', { required: true })),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [requests_1.CreateCertificationAbleBody, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CertificationAbleController.prototype, "create", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/:id'),
    routing_controllers_openapi_1.OpenAPI({
        description: `\n
                      example relations: ["certification", "organization"]`,
    }),
    routing_controllers_1.UseInterceptor(interceptors_1.ClassTransformerInterceptor(responses_1.CertificationAbleResponse)),
    routing_controllers_1.OnUndefined(errors_1.CertificationAbleNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.CertificationAbleResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.QueryParams()),
    tslib_1.__param(2, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.BaseQuery, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CertificationAbleController.prototype, "findOne", null);
tslib_1.__decorate([
    routing_controllers_1.Patch('/:id'),
    routing_controllers_1.OnUndefined(errors_1.CertificationAbleNotFoundError),
    routing_controllers_openapi_1.ResponseSchema(responses_1.CertificationAbleResponse),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.Body({ required: true })),
    tslib_1.__param(2, routing_controllers_1.QueryParam('targetType', { required: true })),
    tslib_1.__param(3, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, requests_1.UpdateCertificationAbleBody, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CertificationAbleController.prototype, "update", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/:id'),
    routing_controllers_1.OnUndefined(errors_1.CertificationAbleNotFoundError),
    tslib_1.__param(0, routing_controllers_1.Param('id')),
    tslib_1.__param(1, routing_controllers_1.CurrentUser({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CertificationAbleController.prototype, "delete", null);
CertificationAbleController = tslib_1.__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.JsonController('/certification-ables'),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 401 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 404 }),
    routing_controllers_openapi_1.ResponseSchema(responses_1.ErrorResponse, { statusCode: 500 }),
    tslib_1.__param(2, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(3, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(4, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__metadata("design:paramtypes", [services_1.CertificationAbleService,
        common_1.ParseHelper,
        repositories_1.FarmRepository,
        repositories_1.ProductRepository,
        repositories_1.CertificationAbleRepository])
], CertificationAbleController);
exports.CertificationAbleController = CertificationAbleController;
//# sourceMappingURL=CertificationAbleController.js.map