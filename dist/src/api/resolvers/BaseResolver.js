"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseResolver = exports.ExtendedQuery = void 0;
const tslib_1 = require("tslib");
const type_graphql_1 = require("type-graphql");
const typedi_1 = require("typedi");
const common_1 = require("../services/common");
const query_1 = require("../types/query");
const typeorm_1 = require("typeorm");
const requests_1 = require("../controllers/requests");
const pluralize_1 = require("pluralize");
const ConditionQueryBuilder_1 = require("../services/common/ConditionQueryBuilder");
const graphql_type_json_1 = require("graphql-type-json");
let ExtendedQuery = class ExtendedQuery extends requests_1.FullQuery {
};
tslib_1.__decorate([
    type_graphql_1.Field(() => graphql_type_json_1.GraphQLJSONObject, { nullable: true }),
    tslib_1.__metadata("design:type", Object)
], ExtendedQuery.prototype, "where", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(() => graphql_type_json_1.GraphQLJSONObject, { nullable: true }),
    tslib_1.__metadata("design:type", Object)
], ExtendedQuery.prototype, "order", void 0);
ExtendedQuery = tslib_1.__decorate([
    type_graphql_1.ArgsType()
], ExtendedQuery);
exports.ExtendedQuery = ExtendedQuery;
// tslint:disable-next-line:typedef
function BaseResolver(TClassFunc, name) {
    const TClass = TClassFunc();
    let PaginateResponse = class PaginateResponse extends query_1.GraphQLPaginationResponse(TClass) {
    };
    PaginateResponse = tslib_1.__decorate([
        type_graphql_1.ObjectType(`${TClass.name}PaginateResponse`)
    ], PaginateResponse);
    let AbstractResolver = class AbstractResolver {
        constructor(parseHelper) {
            this.parseHelper = parseHelper;
            this.repository = typeorm_1.getRepository(TClass);
        }
        findAll(query) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const parsedQuery = this.parseHelper.fullQueryParam(query);
                const [list, count] = yield ConditionQueryBuilder_1.ConditionQueryBuilder.ofRepository(this.repository)
                    .select(undefined)
                    .relations([])
                    .take(parsedQuery.take)
                    .skip(parsedQuery.skip)
                    .condition(parsedQuery.where)
                    .order(query.order)
                    .search(query.search)
                    .build()
                    .getManyAndCount();
                return new PaginateResponse(query, { list, count });
            });
        }
        findOne(id) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                return yield this.repository.findOne(id);
            });
        }
    };
    tslib_1.__decorate([
        type_graphql_1.Query(() => PaginateResponse, { name: pluralize_1.plural(name) }),
        tslib_1.__param(0, type_graphql_1.Args()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [ExtendedQuery]),
        tslib_1.__metadata("design:returntype", Promise)
    ], AbstractResolver.prototype, "findAll", null);
    tslib_1.__decorate([
        type_graphql_1.Query(() => TClass, { name }),
        tslib_1.__param(0, type_graphql_1.Arg('id')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", Promise)
    ], AbstractResolver.prototype, "findOne", null);
    AbstractResolver = tslib_1.__decorate([
        typedi_1.Service(),
        type_graphql_1.Resolver({ isAbstract: true }),
        tslib_1.__metadata("design:paramtypes", [common_1.ParseHelper])
    ], AbstractResolver);
    return AbstractResolver;
}
exports.BaseResolver = BaseResolver;
//# sourceMappingURL=BaseResolver.js.map