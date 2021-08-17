"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationResolver = void 0;
const tslib_1 = require("tslib");
const models_1 = require("../models");
const BaseResolver_1 = require("./BaseResolver");
const type_graphql_1 = require("type-graphql");
let OrganizationResolver = class OrganizationResolver extends BaseResolver_1.BaseResolver(() => models_1.Organization, 'organization') {
};
OrganizationResolver = tslib_1.__decorate([
    type_graphql_1.Resolver()
], OrganizationResolver);
exports.OrganizationResolver = OrganizationResolver;
//# sourceMappingURL=OrganizationResolver.js.map