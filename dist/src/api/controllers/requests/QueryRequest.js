"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullQuery = exports.BaseQuery = exports.PaginationQuery = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
class PaginationQuery {
}
tslib_1.__decorate([
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], PaginationQuery.prototype, "limit", void 0);
tslib_1.__decorate([
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], PaginationQuery.prototype, "offset", void 0);
exports.PaginationQuery = PaginationQuery;
let BaseQuery = class BaseQuery {
    constructor() {
        this.type = 0;
    }
};
tslib_1.__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    type_graphql_1.Field({ defaultValue: 0 }),
    tslib_1.__metadata("design:type", Number)
], BaseQuery.prototype, "type", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    type_graphql_1.Field({ description: 'Where condition in JSON String', defaultValue: '' }),
    tslib_1.__metadata("design:type", String)
], BaseQuery.prototype, "where", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseQuery.prototype, "select", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseQuery.prototype, "relations", void 0);
BaseQuery = tslib_1.__decorate([
    type_graphql_1.ArgsType()
], BaseQuery);
exports.BaseQuery = BaseQuery;
let FullQuery = class FullQuery extends BaseQuery {
};
tslib_1.__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    type_graphql_1.Field({ defaultValue: 1 }),
    tslib_1.__metadata("design:type", Number)
], FullQuery.prototype, "page", void 0);
tslib_1.__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    type_graphql_1.Field({ defaultValue: 10 }),
    tslib_1.__metadata("design:type", Number)
], FullQuery.prototype, "take", void 0);
tslib_1.__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], FullQuery.prototype, "skip", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    type_graphql_1.Field({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], FullQuery.prototype, "search", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    type_graphql_1.Field({ nullable: true, description: 'Sort condition in JSON string' }),
    tslib_1.__metadata("design:type", String)
], FullQuery.prototype, "order", void 0);
FullQuery = tslib_1.__decorate([
    type_graphql_1.ArgsType()
], FullQuery);
exports.FullQuery = FullQuery;
//# sourceMappingURL=QueryRequest.js.map