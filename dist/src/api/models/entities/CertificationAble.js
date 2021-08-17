"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificationAble = void 0;
const tslib_1 = require("tslib");
const type_graphql_1 = require("type-graphql");
const type_graphql_dataloader_1 = require("type-graphql-dataloader");
const typeorm_1 = require("typeorm");
const index_1 = require("../index");
let CertificationAble = class CertificationAble {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn('uuid'),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], CertificationAble.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'target_id', nullable: false }),
    tslib_1.__metadata("design:type", String)
], CertificationAble.prototype, "targetID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'target_type_id', nullable: true }),
    tslib_1.__metadata("design:type", String)
], CertificationAble.prototype, "targetTypeID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'organization_id', nullable: true }),
    tslib_1.__metadata("design:type", String)
], CertificationAble.prototype, "organizationID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'certification_id', nullable: false }),
    tslib_1.__metadata("design:type", String)
], CertificationAble.prototype, "certificationID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], CertificationAble.prototype, "description", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'created_at', default: 'now()' }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], CertificationAble.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'effective_at', default: 'now()' }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], CertificationAble.prototype, "effectiveAt", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'text', array: true, default: [] }),
    type_graphql_1.Field(() => [String]),
    tslib_1.__metadata("design:type", Array)
], CertificationAble.prototype, "urls", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => index_1.Product || index_1.Farm, (ownerCertification) => ownerCertification.certificationAbles),
    typeorm_1.JoinColumn({ name: 'target_id' }),
    tslib_1.__metadata("design:type", Object)
], CertificationAble.prototype, "target", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => index_1.Certification, (certification) => certification.certificationAbles),
    typeorm_1.JoinColumn({ name: 'certification_id' }),
    type_graphql_1.Field(() => index_1.Certification),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", index_1.Certification)
], CertificationAble.prototype, "certification", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => index_1.Organization, (organization) => organization.certificationAbles),
    typeorm_1.JoinColumn({ name: 'organization_id' }),
    type_graphql_1.Field(() => index_1.Organization),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", index_1.Organization)
], CertificationAble.prototype, "organization", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => index_1.TargetType, (targetType) => targetType.certificationAbles),
    typeorm_1.JoinColumn({ name: 'target_type_id' }),
    tslib_1.__metadata("design:type", index_1.TargetType)
], CertificationAble.prototype, "targetType", void 0);
CertificationAble = tslib_1.__decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], CertificationAble);
exports.CertificationAble = CertificationAble;
//# sourceMappingURL=CertificationAble.js.map