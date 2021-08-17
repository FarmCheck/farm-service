"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategory = void 0;
const tslib_1 = require("tslib");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const index_1 = require("../index");
const type_graphql_dataloader_1 = require("type-graphql-dataloader");
let SubCategory = class SubCategory {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn('uuid'),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SubCategory.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'category_id', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SubCategory.prototype, "categoryID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SubCategory.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SubCategory.prototype, "code", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SubCategory.prototype, "note", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SubCategory.prototype, "url", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'url_thumbnail', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SubCategory.prototype, "urlThumbnail", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'created_at', default: 'now()' }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SubCategory.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => index_1.Category, category => category.subCategories),
    typeorm_1.JoinColumn({ name: 'category_id' }),
    type_graphql_1.Field(() => index_1.Category),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", index_1.Category)
], SubCategory.prototype, "category", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => index_1.Product, product => product.subCategory),
    type_graphql_1.Field(() => [index_1.Product]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], SubCategory.prototype, "products", void 0);
SubCategory = tslib_1.__decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], SubCategory);
exports.SubCategory = SubCategory;
//# sourceMappingURL=SubCategory.js.map