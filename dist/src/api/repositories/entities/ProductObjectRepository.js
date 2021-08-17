"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductObjectRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const models_1 = require("../../models");
let ProductObjectRepository = class ProductObjectRepository extends typeorm_1.Repository {
};
ProductObjectRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(models_1.ProductObject)
], ProductObjectRepository);
exports.ProductObjectRepository = ProductObjectRepository;
//# sourceMappingURL=ProductObjectRepository.js.map