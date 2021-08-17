"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCertificationAbleBody = exports.CreateCertificationAbleBody = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const responses_1 = require("../responses");
class CreateCertificationAbleBody extends responses_1.BaseCertificationAble {
}
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateCertificationAbleBody.prototype, "targetType", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], CreateCertificationAbleBody.prototype, "targetTypeID", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsOptional(),
    class_validator_1.IsDateString(),
    tslib_1.__metadata("design:type", String)
], CreateCertificationAbleBody.prototype, "createdAt", void 0);
exports.CreateCertificationAbleBody = CreateCertificationAbleBody;
class UpdateCertificationAbleBody {
}
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateCertificationAbleBody.prototype, "targetType", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], UpdateCertificationAbleBody.prototype, "targetID", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], UpdateCertificationAbleBody.prototype, "organizationID", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], UpdateCertificationAbleBody.prototype, "certificationID", void 0);
exports.UpdateCertificationAbleBody = UpdateCertificationAbleBody;
//# sourceMappingURL=CertificationAbleRequest.js.map