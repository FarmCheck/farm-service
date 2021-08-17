"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductObjectPortalResponse = exports.ProductObjectDetailResponse = exports.ProductObjectBaseResponse = exports.ProductObjectResponse = exports.BaseProductObject = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const index_1 = require("./index");
const index_2 = require("./index");
let BaseProductObject = class BaseProductObject {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseProductObject.prototype, "productID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseProductObject.prototype, "processID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseProductObject.prototype, "areaID", void 0);
tslib_1.__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseProductObject.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseProductObject.prototype, "name", void 0);
tslib_1.__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], BaseProductObject.prototype, "type", void 0);
tslib_1.__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], BaseProductObject.prototype, "objectType", void 0);
tslib_1.__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseProductObject.prototype, "description", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(2),
    tslib_1.__metadata("design:type", Number)
], BaseProductObject.prototype, "status", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseProductObject.prototype, "createdAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseProductObject.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseProductObject.prototype, "deletedAt", void 0);
BaseProductObject = tslib_1.__decorate([
    class_transformer_1.Exclude()
], BaseProductObject);
exports.BaseProductObject = BaseProductObject;
let ProductObjectResponse = class ProductObjectResponse extends BaseProductObject {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], ProductObjectResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => index_1.MediaBaseResponse),
    tslib_1.__metadata("design:type", Array)
], ProductObjectResponse.prototype, "medias", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsObject(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => index_1.AreaBaseResponse),
    tslib_1.__metadata("design:type", index_1.AreaBaseResponse)
], ProductObjectResponse.prototype, "area", void 0);
ProductObjectResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], ProductObjectResponse);
exports.ProductObjectResponse = ProductObjectResponse;
let ProductObjectBaseResponse = class ProductObjectBaseResponse {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], ProductObjectBaseResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], ProductObjectBaseResponse.prototype, "processID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], ProductObjectBaseResponse.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], ProductObjectBaseResponse.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(2),
    tslib_1.__metadata("design:type", Number)
], ProductObjectBaseResponse.prototype, "status", void 0);
ProductObjectBaseResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], ProductObjectBaseResponse);
exports.ProductObjectBaseResponse = ProductObjectBaseResponse;
let ProductObjectDetailResponse = class ProductObjectDetailResponse extends BaseProductObject {
};
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    class_transformer_1.Expose(),
    tslib_1.__metadata("design:type", String)
], ProductObjectDetailResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], ProductObjectDetailResponse.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], ProductObjectDetailResponse.prototype, "name", void 0);
tslib_1.__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], ProductObjectDetailResponse.prototype, "type", void 0);
tslib_1.__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], ProductObjectDetailResponse.prototype, "objectType", void 0);
tslib_1.__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], ProductObjectDetailResponse.prototype, "description", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(2),
    tslib_1.__metadata("design:type", Number)
], ProductObjectDetailResponse.prototype, "status", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], ProductObjectDetailResponse.prototype, "createdAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsObject(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => index_1.AreaBaseResponse),
    tslib_1.__metadata("design:type", index_1.AreaBaseResponse)
], ProductObjectDetailResponse.prototype, "area", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsObject(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => index_1.ProcessBaseResponse),
    tslib_1.__metadata("design:type", index_1.ProcessBaseResponse)
], ProductObjectDetailResponse.prototype, "process", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsObject(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => index_1.ProductBaseResponse),
    tslib_1.__metadata("design:type", index_1.ProductBaseResponse)
], ProductObjectDetailResponse.prototype, "product", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => index_1.SectionDetailResponse),
    tslib_1.__metadata("design:type", Array)
], ProductObjectDetailResponse.prototype, "sections", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => index_1.MediaBaseResponse),
    tslib_1.__metadata("design:type", Array)
], ProductObjectDetailResponse.prototype, "medias", void 0);
ProductObjectDetailResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], ProductObjectDetailResponse);
exports.ProductObjectDetailResponse = ProductObjectDetailResponse;
let ProductObjectPortalResponse = class ProductObjectPortalResponse {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], ProductObjectPortalResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], ProductObjectPortalResponse.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], ProductObjectPortalResponse.prototype, "name", void 0);
tslib_1.__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], ProductObjectPortalResponse.prototype, "type", void 0);
tslib_1.__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], ProductObjectPortalResponse.prototype, "objectType", void 0);
tslib_1.__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], ProductObjectPortalResponse.prototype, "description", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(2),
    tslib_1.__metadata("design:type", Number)
], ProductObjectPortalResponse.prototype, "status", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], ProductObjectPortalResponse.prototype, "createdAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsObject(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => index_1.AreaBaseResponse),
    tslib_1.__metadata("design:type", index_1.AreaBaseResponse)
], ProductObjectPortalResponse.prototype, "area", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsObject(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => index_1.ProcessBaseResponse),
    tslib_1.__metadata("design:type", index_1.ProcessBaseResponse)
], ProductObjectPortalResponse.prototype, "process", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsObject(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => index_2.ProductPortalResponse),
    tslib_1.__metadata("design:type", index_2.ProductPortalResponse)
], ProductObjectPortalResponse.prototype, "product", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => index_1.MediaBaseResponse),
    tslib_1.__metadata("design:type", Array)
], ProductObjectPortalResponse.prototype, "medias", void 0);
ProductObjectPortalResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], ProductObjectPortalResponse);
exports.ProductObjectPortalResponse = ProductObjectPortalResponse;
//# sourceMappingURL=ProductObjectResponse.js.map