"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmployeeBody = exports.CreateEmployeeBody = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const responses_1 = require("../responses");
class CreateEmployeeBody extends responses_1.BaseEmployee {
}
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateEmployeeBody.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(2),
    tslib_1.__metadata("design:type", Number)
], CreateEmployeeBody.prototype, "role", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], CreateEmployeeBody.prototype, "isVerifiedPhoneNumber", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(1),
    tslib_1.__metadata("design:type", Number)
], CreateEmployeeBody.prototype, "status", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateEmployeeBody.prototype, "createdAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateEmployeeBody.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateEmployeeBody.prototype, "deletedAt", void 0);
exports.CreateEmployeeBody = CreateEmployeeBody;
class UpdateEmployeeBody {
}
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateEmployeeBody.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateEmployeeBody.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(2),
    tslib_1.__metadata("design:type", Number)
], UpdateEmployeeBody.prototype, "role", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateEmployeeBody.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], UpdateEmployeeBody.prototype, "avatar", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(1),
    tslib_1.__metadata("design:type", Number)
], UpdateEmployeeBody.prototype, "status", void 0);
exports.UpdateEmployeeBody = UpdateEmployeeBody;
//# sourceMappingURL=EmployeeRequest.js.map