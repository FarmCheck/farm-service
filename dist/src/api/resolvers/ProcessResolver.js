"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessResolver = void 0;
const tslib_1 = require("tslib");
const BaseResolver_1 = require("./BaseResolver");
const models_1 = require("../models");
const type_graphql_1 = require("type-graphql");
let ProcessResolver = class ProcessResolver extends BaseResolver_1.BaseResolver(() => models_1.Process, 'process') {
};
ProcessResolver = tslib_1.__decorate([
    type_graphql_1.Resolver()
], ProcessResolver);
exports.ProcessResolver = ProcessResolver;
//# sourceMappingURL=ProcessResolver.js.map