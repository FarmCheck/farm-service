"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionDetailResponse = exports.SectionResponse = exports.BaseSection = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const index_1 = require("./index");
let BaseSection = class BaseSection {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseSection.prototype, "productObjectID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseSection.prototype, "processID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseSection.prototype, "areaID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(1),
    tslib_1.__metadata("design:type", Number)
], BaseSection.prototype, "status", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], BaseSection.prototype, "type", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseSection.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseSection.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsDateString(),
    tslib_1.__metadata("design:type", String)
], BaseSection.prototype, "createdAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", Number)
], BaseSection.prototype, "diariesTotal", void 0);
BaseSection = tslib_1.__decorate([
    class_transformer_1.Exclude()
], BaseSection);
exports.BaseSection = BaseSection;
let SectionResponse = class SectionResponse extends BaseSection {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], SectionResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsObject(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => index_1.AreaBaseResponse),
    tslib_1.__metadata("design:type", index_1.AreaBaseResponse)
], SectionResponse.prototype, "area", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsObject(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => index_1.ProcessBaseResponse),
    tslib_1.__metadata("design:type", index_1.ProcessBaseResponse)
], SectionResponse.prototype, "process", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsObject(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => index_1.ProductObjectBaseResponse),
    tslib_1.__metadata("design:type", index_1.ProductObjectBaseResponse)
], SectionResponse.prototype, "productObject", void 0);
SectionResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], SectionResponse);
exports.SectionResponse = SectionResponse;
let SectionDetailResponse = class SectionDetailResponse extends BaseSection {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], SectionDetailResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], SectionDetailResponse.prototype, "areaName", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], SectionDetailResponse.prototype, "productObjectName", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], SectionDetailResponse.prototype, "processName", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], SectionDetailResponse.prototype, "typeName", void 0);
SectionDetailResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], SectionDetailResponse);
exports.SectionDetailResponse = SectionDetailResponse;
//# sourceMappingURL=SectionResponse.js.map