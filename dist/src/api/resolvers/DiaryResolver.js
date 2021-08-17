"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryResolver = void 0;
const tslib_1 = require("tslib");
const BaseResolver_1 = require("./BaseResolver");
const models_1 = require("../models");
const type_graphql_1 = require("type-graphql");
let DiaryResolver = class DiaryResolver extends BaseResolver_1.BaseResolver(() => models_1.Diary, 'diary') {
};
DiaryResolver = tslib_1.__decorate([
    type_graphql_1.Resolver()
], DiaryResolver);
exports.DiaryResolver = DiaryResolver;
//# sourceMappingURL=DiaryResolver.js.map