"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrganizationBody = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
// class CreateOrganizationBody extends BaseOrganization {}
class UpdateOrganizationBody {
}
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], UpdateOrganizationBody.prototype, "logo", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateOrganizationBody.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateOrganizationBody.prototype, "description", void 0);
exports.UpdateOrganizationBody = UpdateOrganizationBody;
//# sourceMappingURL=OrganizationRequest.js.map