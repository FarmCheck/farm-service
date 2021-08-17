"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResolver = void 0;
const tslib_1 = require("tslib");
const BaseResolver_1 = require("./BaseResolver");
const models_1 = require("../models");
const type_graphql_1 = require("type-graphql");
let ProductResolver = class ProductResolver extends BaseResolver_1.BaseResolver(() => models_1.Product, 'product') {
};
ProductResolver = tslib_1.__decorate([
    type_graphql_1.Resolver()
], ProductResolver);
exports.ProductResolver = ProductResolver;
//# sourceMappingURL=ProductResolver.js.map