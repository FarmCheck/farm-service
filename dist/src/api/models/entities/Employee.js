"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("../index");
const class_transformer_1 = require("class-transformer");
const type_graphql_1 = require("type-graphql");
const type_graphql_dataloader_1 = require("type-graphql-dataloader");
let Employee = class Employee extends index_1.Base {
};
tslib_1.__decorate([
    typeorm_1.Column({ name: 'farm_id', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Employee.prototype, "farmID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Employee.prototype, "code", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Employee.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false, default: 0 }),
    type_graphql_1.Field({ description: '0: employee, 1: farmer, 2: manager' }),
    tslib_1.__metadata("design:type", Number)
], Employee.prototype, "role", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Employee.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'is_verified_phone_number', default: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], Employee.prototype, "isVerifiedPhoneNumber", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Employee.prototype, "avatar", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'full_text_search_col', nullable: false, select: false }),
    class_transformer_1.Exclude(),
    tslib_1.__metadata("design:type", String)
], Employee.prototype, "fullTextSearch", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => index_1.Farm, (farm) => farm.employees),
    typeorm_1.JoinColumn({ name: 'farm_id' }),
    type_graphql_1.Field(() => index_1.Farm),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", index_1.Farm)
], Employee.prototype, "farm", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => index_1.Area, (area) => area.employee),
    type_graphql_1.Field(() => [index_1.Area]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Employee.prototype, "areas", void 0);
Employee = tslib_1.__decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Employee);
exports.Employee = Employee;
//# sourceMappingURL=Employee.js.map