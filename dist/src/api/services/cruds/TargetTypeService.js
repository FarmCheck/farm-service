"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetTypeService = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const repositories_1 = require("../../repositories");
let TargetTypeService = class TargetTypeService {
    constructor(targetTypeRepository, log) {
        this.targetTypeRepository = targetTypeRepository;
        this.log = log;
    }
    find(option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find all target type');
            const list = yield this.targetTypeRepository.findAndCount({
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
    create(targetType, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new target type');
            targetType.id = uuid_1.default.v1();
            return this.targetTypeRepository.save(targetType);
        });
    }
    findOne(id, option) {
        this.log.info('Find one target type');
        return this.targetTypeRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }
    update(id, targetType, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Update some fields a target type');
            yield this.targetTypeRepository.update(id, targetType);
            return this.targetTypeRepository.findOne(id);
        });
    }
    delete(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a target type');
            const item = yield this.targetTypeRepository.findOne(id);
            if (item === undefined) {
                return undefined;
            }
            yield this.targetTypeRepository.delete(id);
            return item;
        });
    }
};
TargetTypeService = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.TargetTypeRepository, Object])
], TargetTypeService);
exports.TargetTypeService = TargetTypeService;
//# sourceMappingURL=TargetTypeService.js.map