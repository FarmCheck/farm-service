"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmResolver = void 0;
const tslib_1 = require("tslib");
const type_graphql_1 = require("type-graphql");
const models_1 = require("../models");
const BaseResolver_1 = require("./BaseResolver");
let FarmResolver = class FarmResolver extends BaseResolver_1.BaseResolver(() => models_1.Farm, 'farm') {
};
FarmResolver = tslib_1.__decorate([
    type_graphql_1.Resolver()
], FarmResolver);
exports.FarmResolver = FarmResolver;
//# sourceMappingURL=FarmResolver.js.map