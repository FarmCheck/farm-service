"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLPaginationResponse = void 0;
const tslib_1 = require("tslib");
const type_graphql_1 = require("type-graphql");
const services_1 = require("../../services");
const requests_1 = require("../../controllers/requests");
let PaginationInfo = class PaginationInfo {
    constructor(data) {
        Object.assign(this, data);
    }
};
tslib_1.__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], PaginationInfo.prototype, "take", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], PaginationInfo.prototype, "total", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], PaginationInfo.prototype, "totalPage", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], PaginationInfo.prototype, "current", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], PaginationInfo.prototype, "next", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], PaginationInfo.prototype, "prev", void 0);
PaginationInfo = tslib_1.__decorate([
    type_graphql_1.ObjectType(),
    tslib_1.__metadata("design:paramtypes", [Object])
], PaginationInfo);
// tslint:disable-next-line: typedef
function GraphQLPaginationResponse(TClass) {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected,JSMismatchedCollectionQueryUpdate
    let BaseGraphQLPaginationResponse = class BaseGraphQLPaginationResponse {
        constructor(ctx, listData) {
            this.data = listData.list;
            const take = Math.max(ctx.take, 1);
            const totalPage = Math.ceil(listData.count / take);
            this.pagination = new PaginationInfo({
                total: listData.count,
                totalPage,
                prev: Math.max(ctx.page - 1, 1),
                next: Math.min(ctx.page + 1, totalPage),
                current: ctx.page,
                take,
            });
        }
    };
    tslib_1.__decorate([
        type_graphql_1.Field(() => [TClass]),
        tslib_1.__metadata("design:type", Array)
    ], BaseGraphQLPaginationResponse.prototype, "data", void 0);
    tslib_1.__decorate([
        type_graphql_1.Field(() => PaginationInfo),
        tslib_1.__metadata("design:type", PaginationInfo)
    ], BaseGraphQLPaginationResponse.prototype, "pagination", void 0);
    BaseGraphQLPaginationResponse = tslib_1.__decorate([
        type_graphql_1.ObjectType({ isAbstract: true }),
        tslib_1.__metadata("design:paramtypes", [requests_1.FullQuery, services_1.CListData])
    ], BaseGraphQLPaginationResponse);
    return BaseGraphQLPaginationResponse;
}
exports.GraphQLPaginationResponse = GraphQLPaginationResponse;
//# sourceMappingURL=DataList.js.map