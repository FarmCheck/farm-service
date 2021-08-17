"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmCategoryService = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const repositories_1 = require("../../repositories");
let FarmCategoryService = class FarmCategoryService {
    constructor(farmCategoryRepository, log) {
        this.farmCategoryRepository = farmCategoryRepository;
        this.log = log;
    }
    find(option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find all farm category');
            const list = yield this.farmCategoryRepository.findAndCount({
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
    create(farmCategory, option) {
        this.log.info('Create a new farm category');
        farmCategory.id = uuid_1.default.v1();
        return this.farmCategoryRepository.save(farmCategory);
    }
    findOne(id, option) {
        this.log.info('Find one farm category');
        return this.farmCategoryRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }
    update(id, farmCategory, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Update some fields a farm category');
            yield this.farmCategoryRepository.update(id, farmCategory);
            return this.farmCategoryRepository.findOne(id);
        });
    }
    delete(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a farm category');
            const item = yield this.farmCategoryRepository.findOne(id);
            if (item === undefined) {
                return undefined;
            }
            yield this.farmCategoryRepository.delete(id);
            return item;
        });
    }
};
FarmCategoryService = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.FarmCategoryRepository, Object])
], FarmCategoryService);
exports.FarmCategoryService = FarmCategoryService;
//# sourceMappingURL=FarmCategoryService.js.map