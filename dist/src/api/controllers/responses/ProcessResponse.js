"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessDetailResponse = exports.ProcessBaseResponse = exports.ProcessResponse = exports.BaseProcess = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const index_1 = require("./index");
let BaseProcess = class BaseProcess {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseProcess.prototype, "farmID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseProcess.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseProcess.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], BaseProcess.prototype, "quantity", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], BaseProcess.prototype, "isHaveStep", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], BaseProcess.prototype, "productObjectsTotal", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(1),
    tslib_1.__metadata("design:type", Number)
], BaseProcess.prototype, "status", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseProcess.prototype, "createdAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseProcess.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseProcess.prototype, "deletedAt", void 0);
BaseProcess = tslib_1.__decorate([
    class_transformer_1.Exclude()
], BaseProcess);
exports.BaseProcess = BaseProcess;
let ProcessResponse = class ProcessResponse extends BaseProcess {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], ProcessResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => index_1.StepDetailResponse),
    tslib_1.__metadata("design:type", Array)
], ProcessResponse.prototype, "steps", void 0);
ProcessResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], ProcessResponse);
exports.ProcessResponse = ProcessResponse;
let ProcessBaseResponse = class ProcessBaseResponse {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], ProcessBaseResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], ProcessBaseResponse.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], ProcessBaseResponse.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(1),
    tslib_1.__metadata("design:type", Number)
], ProcessBaseResponse.prototype, "status", void 0);
ProcessBaseResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], ProcessBaseResponse);
exports.ProcessBaseResponse = ProcessBaseResponse;
let ProcessDetailResponse = class ProcessDetailResponse extends BaseProcess {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], ProcessDetailResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => index_1.StepDetailResponse),
    tslib_1.__metadata("design:type", Array)
], ProcessDetailResponse.prototype, "steps", void 0);
ProcessDetailResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], ProcessDetailResponse);
exports.ProcessDetailResponse = ProcessDetailResponse;
//# sourceMappingURL=ProcessResponse.js.map