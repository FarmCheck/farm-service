"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const models_1 = require("../../models");
let CategoryRepository = class CategoryRepository extends typeorm_1.Repository {
};
CategoryRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(models_1.Category)
], CategoryRepository);
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=CategoryRepository.js.map