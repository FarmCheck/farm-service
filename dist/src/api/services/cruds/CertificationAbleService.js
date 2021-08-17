"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificationAbleService = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const repositories_1 = require("../../repositories");
const routing_controllers_1 = require("routing-controllers");
let CertificationAbleService = class CertificationAbleService {
    constructor(certificationAbleRepository, targetTypeRepository, log) {
        this.certificationAbleRepository = certificationAbleRepository;
        this.targetTypeRepository = targetTypeRepository;
        this.log = log;
    }
    find(option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find all certification able');
            const list = yield this.certificationAbleRepository.findAndCount({
                skip: option.skip,
                take: option.take,
                select: option.select,
                where: option.where,
                relations: option.relations,
                order: option.order,
            });
            return { list: list[0], count: list[1] };
        });
    }
    create(certificationAble, targetTypeName, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new certification able');
            const targetType = yield this.targetTypeRepository.findOne({ where: { name: targetTypeName } });
            if (!targetType) {
                throw new routing_controllers_1.HttpError(400, 'targetType is invalid');
            }
            certificationAble.id = uuid_1.default.v1();
            certificationAble.targetTypeID = targetType.id;
            return this.certificationAbleRepository.save(certificationAble);
        });
    }
    findOne(id, option) {
        this.log.info('Find one certification able');
        return this.certificationAbleRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }
    update(id, certificationAble, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Update some fields a certification able');
            yield this.certificationAbleRepository.update(id, certificationAble);
            return this.certificationAbleRepository.findOne(id);
        });
    }
    delete(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a certification able');
            const item = yield this.certificationAbleRepository.findOne(id);
            if (item === undefined) {
                return undefined;
            }
            yield this.certificationAbleRepository.delete(id);
            return item;
        });
    }
};
CertificationAbleService = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(2, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CertificationAbleRepository,
        repositories_1.TargetTypeRepository, Object])
], CertificationAbleService);
exports.CertificationAbleService = CertificationAbleService;
//# sourceMappingURL=CertificationAbleService.js.map