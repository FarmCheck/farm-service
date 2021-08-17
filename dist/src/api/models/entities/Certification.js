"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Certification = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("../index");
const type_graphql_1 = require("type-graphql");
const type_graphql_dataloader_1 = require("type-graphql-dataloader");
let Certification = class Certification {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn('uuid'),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Certification.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Certification.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Certification.prototype, "code", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Certification.prototype, "logo", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'created_at', default: 'now()' }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Certification.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => index_1.CertificationAble, (certificationAble) => certificationAble.certification),
    type_graphql_1.Field(() => index_1.CertificationAble),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Certification.prototype, "certificationAbles", void 0);
Certification = tslib_1.__decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Certification);
exports.Certification = Certification;
//# sourceMappingURL=Certification.js.map