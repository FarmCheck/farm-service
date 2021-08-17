"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const repositories_1 = require("../../repositories");
const common_1 = require("../../../common");
let CategoryService = class CategoryService {
    constructor(categoryRepository, log) {
        this.categoryRepository = categoryRepository;
        this.log = log;
    }
    find(option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find all category');
            const list = yield this.categoryRepository.findAndCount({
                skip: option.skip,
                take: option.take,
                select: option.select,
                where: option.where,
                relations: option.relations,
                order: option.order,
                cache: true,
            });
            return { list: list[0], count: list[1] };
        });
    }
    getValidCodeInTransaction(category) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return common_1.Helper.combineFirstCharacterAndLastWord(category.name);
        });
    }
    create(category, option) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new category');
            category.id = uuid_1.default.v1();
            category.code = (_a = category.code) !== null && _a !== void 0 ? _a : yield this.getValidCodeInTransaction(category);
            return this.categoryRepository.save(category);
        });
    }
    findOne(id, option) {
        this.log.info('Find one category');
        return this.categoryRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }
    update(id, category, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Update some fields a category');
            yield this.categoryRepository.update(id, category);
            return this.categoryRepository.findOne(id);
        });
    }
    delete(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a category');
            const item = yield this.categoryRepository.findOne(id);
            if (item === undefined) {
                return undefined;
            }
            yield this.categoryRepository.delete(id);
            return item;
        });
    }
};
CategoryService = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CategoryRepository, Object])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=CategoryService.js.map