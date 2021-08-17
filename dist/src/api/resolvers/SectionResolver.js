"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionResolver = void 0;
const tslib_1 = require("tslib");
const BaseResolver_1 = require("./BaseResolver");
const models_1 = require("../models");
const type_graphql_1 = require("type-graphql");
let SectionResolver = class SectionResolver extends BaseResolver_1.BaseResolver(() => models_1.Section, 'section') {
};
SectionResolver = tslib_1.__decorate([
    type_graphql_1.Resolver()
], SectionResolver);
exports.SectionResolver = SectionResolver;
//# sourceMappingURL=SectionResolver.js.map