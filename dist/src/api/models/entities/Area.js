"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Area = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("../index");
const class_transformer_1 = require("class-transformer");
const type_graphql_1 = require("type-graphql");
const type_graphql_dataloader_1 = require("type-graphql-dataloader");
let Area = class Area extends index_1.Base {
};
tslib_1.__decorate([
    typeorm_1.Column({ name: 'location_id', nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Area.prototype, "locationID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'employee_id', nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Area.prototype, "employeeID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'farm_id', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Area.prototype, "farmID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Area.prototype, "code", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'product_objects_total', nullable: false, default: 0 }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], Area.prototype, "productObjectsTotal", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Area.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false, default: 0 }),
    type_graphql_1.Field({ description: '0: field area, 1: farming area, 2: production area, 3: field & product area, 4: field & production area, 5: others' }),
    tslib_1.__metadata("design:type", Number)
], Area.prototype, "type", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Area.prototype, "description", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Area.prototype, "address", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Area.prototype, "latitude", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Area.prototype, "longitude", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'full_text_search_col', nullable: false, select: false }),
    class_transformer_1.Exclude(),
    tslib_1.__metadata("design:type", String)
], Area.prototype, "fullTextSearch", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => index_1.MediaAble, (mediaAble) => mediaAble.target),
    type_graphql_1.Field(() => [index_1.MediaAble]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Area.prototype, "mediaAbles", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => index_1.ProductObject, (productObject) => productObject.area),
    type_graphql_1.Field(() => [index_1.ProductObject]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Area.prototype, "productObjects", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => index_1.Section, (section) => section.area),
    type_graphql_1.Field(() => [index_1.Section]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Area.prototype, "sections", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => index_1.Location, (location) => location.areas),
    typeorm_1.JoinColumn({ name: 'location_id' }),
    type_graphql_1.Field(() => index_1.Location),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", index_1.Location)
], Area.prototype, "location", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => index_1.Farm, (farm) => farm.areas),
    typeorm_1.JoinColumn({ name: 'farm_id' }),
    type_graphql_1.Field(() => index_1.Farm),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", index_1.Farm)
], Area.prototype, "farm", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => index_1.Employee, (employee) => employee.areas),
    typeorm_1.JoinColumn({ name: 'employee_id' }),
    type_graphql_1.Field(() => index_1.Employee),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", index_1.Employee)
], Area.prototype, "employee", void 0);
Area = tslib_1.__decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Area);
exports.Area = Area;
//# sourceMappingURL=Area.js.map