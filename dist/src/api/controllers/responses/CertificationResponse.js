"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificationBaseResponse = exports.CertificationResponse = exports.BaseCertification = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let BaseCertification = class BaseCertification {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseCertification.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseCertification.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], BaseCertification.prototype, "logo", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsDateString(),
    tslib_1.__metadata("design:type", String)
], BaseCertification.prototype, "createdAt", void 0);
BaseCertification = tslib_1.__decorate([
    class_transformer_1.Exclude()
], BaseCertification);
exports.BaseCertification = BaseCertification;
let CertificationResponse = class CertificationResponse extends BaseCertification {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], CertificationResponse.prototype, "id", void 0);
CertificationResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], CertificationResponse);
exports.CertificationResponse = CertificationResponse;
let CertificationBaseResponse = class CertificationBaseResponse {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], CertificationBaseResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], CertificationBaseResponse.prototype, "logo", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CertificationBaseResponse.prototype, "name", void 0);
CertificationBaseResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], CertificationBaseResponse);
exports.CertificationBaseResponse = CertificationBaseResponse;
//# sourceMappingURL=CertificationResponse.js.map