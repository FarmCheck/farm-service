"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeDetailResponse = exports.EmployeeBaseResponse = exports.EmployeeResponse = exports.BaseEmployee = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const index_1 = require("./index");
let BaseEmployee = class BaseEmployee {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseEmployee.prototype, "farmID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseEmployee.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseEmployee.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(2),
    tslib_1.__metadata("design:type", Number)
], BaseEmployee.prototype, "role", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseEmployee.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], BaseEmployee.prototype, "avatar", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], BaseEmployee.prototype, "isVerifiedPhoneNumber", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(1),
    tslib_1.__metadata("design:type", Number)
], BaseEmployee.prototype, "status", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseEmployee.prototype, "createdAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseEmployee.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseEmployee.prototype, "deletedAt", void 0);
BaseEmployee = tslib_1.__decorate([
    class_transformer_1.Exclude()
], BaseEmployee);
exports.BaseEmployee = BaseEmployee;
let EmployeeResponse = class EmployeeResponse extends BaseEmployee {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], EmployeeResponse.prototype, "id", void 0);
EmployeeResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], EmployeeResponse);
exports.EmployeeResponse = EmployeeResponse;
let EmployeeBaseResponse = class EmployeeBaseResponse {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], EmployeeBaseResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], EmployeeBaseResponse.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], EmployeeBaseResponse.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(2),
    tslib_1.__metadata("design:type", Number)
], EmployeeBaseResponse.prototype, "role", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], EmployeeBaseResponse.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(1),
    tslib_1.__metadata("design:type", Number)
], EmployeeBaseResponse.prototype, "status", void 0);
EmployeeBaseResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], EmployeeBaseResponse);
exports.EmployeeBaseResponse = EmployeeBaseResponse;
let EmployeeDetailResponse = class EmployeeDetailResponse extends BaseEmployee {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], EmployeeDetailResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsObject(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => index_1.FarmResponse),
    tslib_1.__metadata("design:type", index_1.FarmResponse)
], EmployeeDetailResponse.prototype, "farm", void 0);
EmployeeDetailResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], EmployeeDetailResponse);
exports.EmployeeDetailResponse = EmployeeDetailResponse;
//# sourceMappingURL=EmployeeResponse.js.map