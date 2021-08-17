"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const models_1 = require("../../models");
let ProductRepository = class ProductRepository extends typeorm_1.Repository {
};
ProductRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(models_1.Product)
], ProductRepository);
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=ProductRepository.js.map