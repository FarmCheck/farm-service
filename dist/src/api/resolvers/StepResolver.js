"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepResolver = void 0;
const tslib_1 = require("tslib");
const models_1 = require("../models");
const BaseResolver_1 = require("./BaseResolver");
const type_graphql_1 = require("type-graphql");
let StepResolver = class StepResolver extends BaseResolver_1.BaseResolver(() => models_1.Step, 'step') {
};
StepResolver = tslib_1.__decorate([
    type_graphql_1.Resolver()
], StepResolver);
exports.StepResolver = StepResolver;
//# sourceMappingURL=StepResolver.js.map