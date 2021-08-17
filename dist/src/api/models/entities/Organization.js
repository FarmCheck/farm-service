"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("../index");
const type_graphql_1 = require("type-graphql");
const type_graphql_dataloader_1 = require("type-graphql-dataloader");
let Organization = class Organization {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn('uuid'),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Organization.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Organization.prototype, "logo", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Organization.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Organization.prototype, "description", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => index_1.CertificationAble, (certificationAble) => certificationAble.organization),
    type_graphql_1.Field(() => [index_1.CertificationAble]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Organization.prototype, "certificationAbles", void 0);
Organization = tslib_1.__decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Organization);
exports.Organization = Organization;
//# sourceMappingURL=Organization.js.map