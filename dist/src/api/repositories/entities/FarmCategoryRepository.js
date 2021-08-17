"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmCategoryRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const models_1 = require("../../models");
let FarmCategoryRepository = class FarmCategoryRepository extends typeorm_1.Repository {
};
FarmCategoryRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(models_1.FarmCategory)
], FarmCategoryRepository);
exports.FarmCategoryRepository = FarmCategoryRepository;
//# sourceMappingURL=FarmCategoryRepository.js.map