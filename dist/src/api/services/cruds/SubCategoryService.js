"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryService = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const repositories_1 = require("../../repositories");
const common_1 = require("../../../common");
let SubCategoryService = class SubCategoryService {
    constructor(subCategoryRepository, log) {
        this.subCategoryRepository = subCategoryRepository;
        this.log = log;
    }
    find(option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find all sub category');
            const list = yield this.subCategoryRepository.findAndCount({
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
    create(subCategory, option) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new sub category');
            subCategory.id = uuid_1.default.v1();
            subCategory.code = (_a = subCategory.code) !== null && _a !== void 0 ? _a : yield common_1.Helper.combineFirstCharacterAndLastWord(subCategory.name);
            return this.subCategoryRepository.save(subCategory);
        });
    }
    findOne(id, option) {
        this.log.info('Find one sub category');
        return this.subCategoryRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }
    update(id, subCategory, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Update some fields a sub category');
            yield this.subCategoryRepository.update(id, subCategory);
            return this.subCategoryRepository.findOne(id);
        });
    }
    delete(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a sub category');
            const item = yield this.subCategoryRepository.findOne(id);
            if (item === undefined) {
                return undefined;
            }
            yield this.subCategoryRepository.delete(id);
            return item;
        });
    }
};
SubCategoryService = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.SubCategoryRepository, Object])
], SubCategoryService);
exports.SubCategoryService = SubCategoryService;
//# sourceMappingURL=SubCategoryService.js.map