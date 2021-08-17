"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCertificationBody = exports.CreateCertificationBody = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const responses_1 = require("../responses");
class CreateCertificationBody extends responses_1.BaseCertification {
}
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsOptional(),
    class_validator_1.IsDateString(),
    tslib_1.__metadata("design:type", String)
], CreateCertificationBody.prototype, "createdAt", void 0);
exports.CreateCertificationBody = CreateCertificationBody;
class UpdateCertificationBody {
}
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateCertificationBody.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateCertificationBody.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], UpdateCertificationBody.prototype, "logo", void 0);
exports.UpdateCertificationBody = UpdateCertificationBody;
//# sourceMappingURL=CertificationRequest.js.map