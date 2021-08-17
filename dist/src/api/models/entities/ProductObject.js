"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductObject = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("../index");
const class_transformer_1 = require("class-transformer");
const type_graphql_1 = require("type-graphql");
const type_graphql_dataloader_1 = require("type-graphql-dataloader");
let ProductObject = class ProductObject extends index_1.Base {
};
tslib_1.__decorate([
    typeorm_1.Column({ name: 'product_id', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ProductObject.prototype, "productID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'process_id', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ProductObject.prototype, "processID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'area_id', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ProductObject.prototype, "areaID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false, unique: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ProductObject.prototype, "code", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ProductObject.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false, default: 0 }),
    type_graphql_1.Field({ description: '0: field plant, 1: farming plant, 2: production plant' }),
    tslib_1.__metadata("design:type", Number)
], ProductObject.prototype, "type", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'object_type', nullable: false, default: 0 }),
    type_graphql_1.Field({ description: '0: tree, 1: bed, 2: all, 3: farm, 4: closed farm, 5: others' }),
    tslib_1.__metadata("design:type", Number)
], ProductObject.prototype, "objectType", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ProductObject.prototype, "description", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'full_text_search_col', nullable: false, select: false }),
    class_transformer_1.Exclude(),
    tslib_1.__metadata("design:type", String)
], ProductObject.prototype, "fullTextSearch", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => index_1.MediaAble, (mediaAble) => mediaAble.target),
    type_graphql_1.Field(() => [index_1.MediaAble]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], ProductObject.prototype, "mediaAbles", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => index_1.Section, (section) => section.productObject),
    type_graphql_1.Field(() => [index_1.Section]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], ProductObject.prototype, "sections", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => index_1.Product, (product) => product.productObjects),
    typeorm_1.JoinColumn({ name: 'product_id' }),
    type_graphql_1.Field(() => index_1.Product),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", index_1.Product)
], ProductObject.prototype, "product", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => index_1.Process, (process) => process.productObjects),
    typeorm_1.JoinColumn({ name: 'process_id' }),
    type_graphql_1.Field(() => index_1.Process),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", index_1.Process)
], ProductObject.prototype, "process", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => index_1.Area, (area) => area.productObjects),
    typeorm_1.JoinColumn({ name: 'area_id' }),
    type_graphql_1.Field(() => index_1.Area),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", index_1.Area)
], ProductObject.prototype, "area", void 0);
ProductObject = tslib_1.__decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], ProductObject);
exports.ProductObject = ProductObject;
//# sourceMappingURL=ProductObject.js.map