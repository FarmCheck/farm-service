"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaResolver = void 0;
const tslib_1 = require("tslib");
const models_1 = require("../models");
const BaseResolver_1 = require("./BaseResolver");
const type_graphql_1 = require("type-graphql");
let AreaResolver = class AreaResolver extends BaseResolver_1.BaseResolver(() => models_1.Area, 'area') {
};
AreaResolver = tslib_1.__decorate([
    type_graphql_1.Resolver()
], AreaResolver);
exports.AreaResolver = AreaResolver;
//# sourceMappingURL=AreaResolver.js.map