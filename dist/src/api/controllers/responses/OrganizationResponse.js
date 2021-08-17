"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationBaseResponse = exports.OrganizationResponse = exports.BaseOrganization = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let BaseOrganization = class BaseOrganization {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], BaseOrganization.prototype, "logo", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseOrganization.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseOrganization.prototype, "description", void 0);
BaseOrganization = tslib_1.__decorate([
    class_transformer_1.Exclude()
], BaseOrganization);
exports.BaseOrganization = BaseOrganization;
let OrganizationResponse = class OrganizationResponse extends BaseOrganization {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], OrganizationResponse.prototype, "id", void 0);
OrganizationResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], OrganizationResponse);
exports.OrganizationResponse = OrganizationResponse;
let OrganizationBaseResponse = class OrganizationBaseResponse {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], OrganizationBaseResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], OrganizationBaseResponse.prototype, "logo", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], OrganizationBaseResponse.prototype, "name", void 0);
OrganizationBaseResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], OrganizationBaseResponse);
exports.OrganizationBaseResponse = OrganizationBaseResponse;
//# sourceMappingURL=OrganizationResponse.js.map