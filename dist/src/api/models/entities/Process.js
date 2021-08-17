"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Process = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("../index");
const type_graphql_1 = require("type-graphql");
const type_graphql_dataloader_1 = require("type-graphql-dataloader");
const class_transformer_1 = require("class-transformer");
let Process = class Process extends index_1.Base {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn('uuid'),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Process.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'farm_id', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Process.prototype, "farmID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Process.prototype, "code", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'product_objects_total', nullable: false, default: 0 }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], Process.prototype, "productObjectsTotal", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Process.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: 0 }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], Process.prototype, "quantity", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'is_have_step', default: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], Process.prototype, "isHaveStep", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'full_text_search_col', nullable: false, select: false }),
    class_transformer_1.Exclude(),
    tslib_1.__metadata("design:type", String)
], Process.prototype, "fullTextSearch", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => index_1.Step, (step) => step.process),
    type_graphql_1.Field(() => [index_1.Step]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Process.prototype, "steps", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => index_1.ProductObject, (productObject) => productObject.process),
    type_graphql_1.Field(() => [index_1.ProductObject]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Process.prototype, "productObjects", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => index_1.Section, (section) => section.process),
    type_graphql_1.Field(() => [index_1.Section]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Process.prototype, "sections", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => index_1.Farm, (farm) => farm.processes),
    typeorm_1.JoinColumn({ name: 'farm_id' }),
    type_graphql_1.Field(() => index_1.Farm),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", index_1.Farm)
], Process.prototype, "farm", void 0);
Process = tslib_1.__decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Process);
exports.Process = Process;
//# sourceMappingURL=Process.js.map