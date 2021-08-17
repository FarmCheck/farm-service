"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const models_1 = require("../../models");
let SubCategoryRepository = class SubCategoryRepository extends typeorm_1.Repository {
};
SubCategoryRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(models_1.SubCategory)
], SubCategoryRepository);
exports.SubCategoryRepository = SubCategoryRepository;
//# sourceMappingURL=SubCategoryRepository.js.map