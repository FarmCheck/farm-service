"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const index_1 = require("../index");
const type_graphql_dataloader_1 = require("type-graphql-dataloader");
let Category = class Category {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn('uuid'),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "code", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "note", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "url", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'url_thumbnail', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "urlThumbnail", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'created_at', default: 'now()' }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => index_1.SubCategory, subCategory => subCategory.category),
    type_graphql_1.Field(() => [index_1.SubCategory]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "subCategories", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => index_1.FarmCategory, farmCategory => farmCategory.category),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "farmCategories", void 0);
Category = tslib_1.__decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map