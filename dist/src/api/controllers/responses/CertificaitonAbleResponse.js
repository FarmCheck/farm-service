"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificationAbleResponse = exports.BaseCertificationAble = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const index_1 = require("./index");
let BaseCertificationAble = class BaseCertificationAble {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseCertificationAble.prototype, "targetID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseCertificationAble.prototype, "targetTypeID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseCertificationAble.prototype, "organizationID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseCertificationAble.prototype, "certificationID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseCertificationAble.prototype, "description", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsDateString(),
    tslib_1.__metadata("design:type", String)
], BaseCertificationAble.prototype, "createdAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsDateString(),
    tslib_1.__metadata("design:type", String)
], BaseCertificationAble.prototype, "effectiveAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString({ each: true }),
    tslib_1.__metadata("design:type", Array)
], BaseCertificationAble.prototype, "urls", void 0);
BaseCertificationAble = tslib_1.__decorate([
    class_transformer_1.Exclude()
], BaseCertificationAble);
exports.BaseCertificationAble = BaseCertificationAble;
let CertificationAbleResponse = class CertificationAbleResponse extends BaseCertificationAble {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], CertificationAbleResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], CertificationAbleResponse.prototype, "targetID", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CertificationAbleResponse.prototype, "targetTypeID", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], CertificationAbleResponse.prototype, "organizationID", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], CertificationAbleResponse.prototype, "certificationID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => index_1.OrganizationBaseResponse),
    tslib_1.__metadata("design:type", index_1.OrganizationBaseResponse)
], CertificationAbleResponse.prototype, "organization", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => index_1.CertificationBaseResponse),
    tslib_1.__metadata("design:type", index_1.CertificationBaseResponse)
], CertificationAbleResponse.prototype, "certification", void 0);
CertificationAbleResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], CertificationAbleResponse);
exports.CertificationAbleResponse = CertificationAbleResponse;
//# sourceMappingURL=CertificaitonAbleResponse.js.map