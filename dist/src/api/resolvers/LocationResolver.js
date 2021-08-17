"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationResolver = void 0;
const tslib_1 = require("tslib");
const models_1 = require("../models");
const BaseResolver_1 = require("./BaseResolver");
const type_graphql_1 = require("type-graphql");
let LocationResolver = class LocationResolver extends BaseResolver_1.BaseResolver(() => models_1.Location, 'location') {
};
LocationResolver = tslib_1.__decorate([
    type_graphql_1.Resolver()
], LocationResolver);
exports.LocationResolver = LocationResolver;
//# sourceMappingURL=LocationResolver.js.map