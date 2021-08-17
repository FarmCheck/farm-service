"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("../index");
const class_transformer_1 = require("class-transformer");
const type_graphql_1 = require("type-graphql");
const type_graphql_dataloader_1 = require("type-graphql-dataloader");
let Product = class Product extends index_1.Base {
};
tslib_1.__decorate([
    typeorm_1.Column({ name: 'farm_id', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "farmID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'sub_category_id', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "subCategoryID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'location_id', nullable: true }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "locationID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "code", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'product_objects_total', nullable: false, default: 0 }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "productObjectsTotal", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false, default: '0000000000000' }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "barcode", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: 0 }),
    type_graphql_1.Field({ description: '0: item, 1: kilogram, 2: others' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "unit", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "description", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "price", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "duration", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'duration_type', nullable: true }),
    type_graphql_1.Field({ description: '0: day, 1: week, 2: month, 3: year' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "durationType", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'is_have_brand', default: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], Product.prototype, "isHaveBrand", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'brand_name', nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "brandName", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'brand_description', nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "brandDescription", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'tax_code', nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "taxCode", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "email", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'number_phone', nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "website", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "logo", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "banner", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "address", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "latitude", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "longitude", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'full_text_search_col', nullable: false, select: false }),
    class_transformer_1.Exclude(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "fullTextSearch", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(() => index_1.CertificationAble, (certificationAble) => certificationAble.target),
    type_graphql_1.Field(() => [index_1.CertificationAble]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "certificationAbles", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => index_1.MediaAble, (mediaAble) => mediaAble.target),
    type_graphql_1.Field(() => [index_1.MediaAble]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "mediaAbles", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(() => index_1.ProductObject, (productObject) => productObject.product),
    type_graphql_1.Field(() => [index_1.ProductObject]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "productObjects", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => index_1.Location, (location) => location.products),
    typeorm_1.JoinColumn({ name: 'location_id' }),
    type_graphql_1.Field(() => index_1.Location),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", index_1.Location)
], Product.prototype, "location", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => index_1.Farm, (farm) => farm.products),
    typeorm_1.JoinColumn({ name: 'farm_id' }),
    type_graphql_1.Field(() => index_1.Farm),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", index_1.Farm)
], Product.prototype, "farm", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(() => index_1.SubCategory, (subCategory) => subCategory.products),
    typeorm_1.JoinColumn({ name: 'sub_category_id' }),
    type_graphql_1.Field(() => index_1.SubCategory),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", index_1.SubCategory)
], Product.prototype, "subCategory", void 0);
Product = tslib_1.__decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Product);
exports.Product = Product;
//# sourceMappingURL=Product.js.map