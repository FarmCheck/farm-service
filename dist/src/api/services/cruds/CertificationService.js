"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificationService = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const repositories_1 = require("../../repositories");
const common_1 = require("../../../common");
let CertificationService = class CertificationService {
    constructor(certificationRepository, log) {
        this.certificationRepository = certificationRepository;
        this.log = log;
    }
    find(option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find all certification');
            const list = yield this.certificationRepository.findAndCount({
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
    create(certification, option) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new certification');
            certification.id = uuid_1.default.v1();
            certification.code = (_a = certification.code) !== null && _a !== void 0 ? _a : yield common_1.Helper.combineFirstCharacterAndLastWord(certification.name);
            return this.certificationRepository.save(certification);
        });
    }
    findOne(id, option) {
        this.log.info('Find one certification');
        return this.certificationRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }
    update(id, certification, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Update some fields a certification');
            yield this.certificationRepository.update(id, certification);
            return this.certificationRepository.findOne(id);
        });
    }
    delete(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a certification');
            const item = yield this.certificationRepository.findOne(id);
            if (item === undefined) {
                return undefined;
            }
            yield this.certificationRepository.delete(id);
            return item;
        });
    }
};
CertificationService = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CertificationRepository, Object])
], CertificationService);
exports.CertificationService = CertificationService;
//# sourceMappingURL=CertificationService.js.map