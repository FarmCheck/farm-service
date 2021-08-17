"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificationResolver = void 0;
const tslib_1 = require("tslib");
const BaseResolver_1 = require("./BaseResolver");
const models_1 = require("../models");
const type_graphql_1 = require("type-graphql");
let CertificationResolver = class CertificationResolver extends BaseResolver_1.BaseResolver(() => models_1.Certification, 'certification') {
};
CertificationResolver = tslib_1.__decorate([
    type_graphql_1.Resolver()
], CertificationResolver);
exports.CertificationResolver = CertificationResolver;
//# sourceMappingURL=CertificationResolver.js.map