"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Farm = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("../index");
const class_transformer_1 = require("class-transformer");
const type_graphql_1 = require("type-graphql");
const type_graphql_dataloader_1 = require("type-graphql-dataloader");
let Farm = class Farm extends index_1.Base {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn('uuid'),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Farm.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'location_id', nullable: true }),
    tslib_1.__metadata("design:type", String)
], Farm.prototype, "locationID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'user_id', nullable: false }),
    tslib_1.__metadata("design:type", String)
], Farm.prototype, "userID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Farm.prototype, "code", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'products_total', nullable: false, default: 0 }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], Farm.prototype, "productsTotal", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Farm.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Farm.prototype, "description", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'is_verified_phone_number', default: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], Farm.prototype, "isVerifiedPhoneNumber", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'is_verified_email', default: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], Farm.prototype, "isVerifiedEmail", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Farm.prototype, "email", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Farm.prototype, "logo", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Farm.prototype, "banner", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Farm.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Farm.prototype, "website", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Farm.prototype, "address", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Farm.prototype, "latitude", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Farm.prototype, "longitude", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'full_text_search_col', nullable: false, select: false }),
    class_transformer_1.Exclude(),
    tslib_1.__metadata("design:type", String)
], Farm.prototype, "fullTextSearch", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => index_1.FarmPayment, (farmPayment) => farmPayment.farm),
    type_graphql_1.Field(() => [index_1.FarmPayment]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Farm.prototype, "farmPayments", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => index_1.MediaAble, (mediaAble) => mediaAble.target),
    type_graphql_1.Field(() => [index_1.MediaAble]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Farm.prototype, "mediaAbles", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => index_1.CertificationAble, (certificationAble) => certificationAble.target),
    type_graphql_1.Field(() => [index_1.CertificationAble]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Farm.prototype, "certificationAbles", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => index_1.Area, (area) => area.farm),
    type_graphql_1.Field(() => [index_1.Area]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Farm.prototype, "areas", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => index_1.Employee, (employee) => employee.farm),
    type_graphql_1.Field(() => [index_1.Employee]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Farm.prototype, "employees", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => index_1.Product, (product) => product.farm),
    type_graphql_1.Field(() => [index_1.Product]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Farm.prototype, "products", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => index_1.Process, (process) => process.farm),
    type_graphql_1.Field(() => [index_1.Process]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Farm.prototype, "processes", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => index_1.FarmCategory, (farmCategory) => farmCategory.farm),
    type_graphql_1.Field(() => [index_1.FarmCategory]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Farm.prototype, "farmCategories", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => index_1.Location, (location) => location.farms),
    typeorm_1.JoinColumn({ name: 'location_id' }),
    type_graphql_1.Field(() => index_1.Location),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", index_1.Location)
], Farm.prototype, "location", void 0);
Farm = tslib_1.__decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Farm);
exports.Farm = Farm;
//# sourceMappingURL=Farm.js.map