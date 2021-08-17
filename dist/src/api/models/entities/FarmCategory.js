"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmCategory = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("../index");
const type_graphql_1 = require("type-graphql");
const type_graphql_dataloader_1 = require("type-graphql-dataloader");
let FarmCategory = class FarmCategory {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn('uuid'),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], FarmCategory.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'farm_id', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], FarmCategory.prototype, "farmID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'category_id', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], FarmCategory.prototype, "categoryID", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => index_1.Farm, (farm) => farm.farmCategories),
    typeorm_1.JoinColumn({ name: 'farm_id' }),
    type_graphql_1.Field(() => index_1.Farm),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", index_1.Farm)
], FarmCategory.prototype, "farm", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => index_1.Category, (category) => category.farmCategories),
    typeorm_1.JoinColumn({ name: 'category_id' }),
    type_graphql_1.Field(() => index_1.Category),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", index_1.Category)
], FarmCategory.prototype, "category", void 0);
FarmCategory = tslib_1.__decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], FarmCategory);
exports.FarmCategory = FarmCategory;
//# sourceMappingURL=FarmCategory.js.map