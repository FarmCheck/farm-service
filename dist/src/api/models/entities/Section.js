"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Section = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const type_graphql_dataloader_1 = require("type-graphql-dataloader");
const Diary_1 = require("./Diary");
const Process_1 = require("./Process");
const Area_1 = require("./Area");
const ProductObject_1 = require("./ProductObject");
let Section = class Section {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn('uuid'),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Section.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'product_object_id', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Section.prototype, "productObjectID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'process_id', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Section.prototype, "processID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'area_id', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Section.prototype, "areaID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Section.prototype, "code", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Section.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: 0 }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], Section.prototype, "status", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: 0 }),
    type_graphql_1.Field({ description: '0: season, 1: batch' }),
    tslib_1.__metadata("design:type", Number)
], Section.prototype, "type", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'created_at', default: 'now()' }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Section.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'diaries_total', default: 0 }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], Section.prototype, "diariesTotal", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => Diary_1.Diary, (diary) => diary.section),
    type_graphql_1.Field(() => [Diary_1.Diary]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Section.prototype, "diaries", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => Process_1.Process, (process) => process.sections),
    typeorm_1.JoinColumn({ name: 'process_id' }),
    type_graphql_1.Field(() => Process_1.Process),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Process_1.Process)
], Section.prototype, "process", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => Area_1.Area, (area) => area.sections),
    typeorm_1.JoinColumn({ name: 'area_id' }),
    type_graphql_1.Field(() => Area_1.Area),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Area_1.Area)
], Section.prototype, "area", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => ProductObject_1.ProductObject, (productObject) => productObject.sections),
    typeorm_1.JoinColumn({ name: 'product_object_id' }),
    type_graphql_1.Field(() => ProductObject_1.ProductObject),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", ProductObject_1.ProductObject)
], Section.prototype, "productObject", void 0);
Section = tslib_1.__decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Section);
exports.Section = Section;
//# sourceMappingURL=Section.js.map