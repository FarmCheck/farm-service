"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPortalResponse = exports.ProductDetailResponse = exports.ProductBaseResponse = exports.ProductResponse = exports.BaseProduct = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const index_1 = require("./index");
let BaseProduct = class BaseProduct {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseProduct.prototype, "locationID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseProduct.prototype, "farmID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseProduct.prototype, "subCategoryID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(13, 13),
    tslib_1.__metadata("design:type", String)
], BaseProduct.prototype, "barcode", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseProduct.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseProduct.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], BaseProduct.prototype, "unit", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseProduct.prototype, "description", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], BaseProduct.prototype, "duration", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], BaseProduct.prototype, "durationType", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], BaseProduct.prototype, "price", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], BaseProduct.prototype, "isHaveBrand", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseProduct.prototype, "brandName", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseProduct.prototype, "brandDescription", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(14, 14),
    class_validator_1.Contains('-'),
    tslib_1.__metadata("design:type", String)
], BaseProduct.prototype, "taxCode", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseProduct.prototype, "email", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseProduct.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], BaseProduct.prototype, "isVerifiedPhoneNumber", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], BaseProduct.prototype, "website", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], BaseProduct.prototype, "logo", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], BaseProduct.prototype, "banner", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseProduct.prototype, "address", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsLatitude(),
    tslib_1.__metadata("design:type", String)
], BaseProduct.prototype, "latitude", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsLongitude(),
    tslib_1.__metadata("design:type", String)
], BaseProduct.prototype, "longitude", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], BaseProduct.prototype, "productObjectsTotal", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(2),
    tslib_1.__metadata("design:type", Number)
], BaseProduct.prototype, "status", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseProduct.prototype, "createdAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseProduct.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseProduct.prototype, "deletedAt", void 0);
BaseProduct = tslib_1.__decorate([
    class_transformer_1.Exclude()
], BaseProduct);
exports.BaseProduct = BaseProduct;
let ProductResponse = class ProductResponse extends BaseProduct {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], ProductResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => index_1.MediaBaseResponse),
    tslib_1.__metadata("design:type", Array)
], ProductResponse.prototype, "medias", void 0);
ProductResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], ProductResponse);
exports.ProductResponse = ProductResponse;
let ProductBaseResponse = class ProductBaseResponse {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], ProductBaseResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], ProductBaseResponse.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(13, 13),
    tslib_1.__metadata("design:type", String)
], ProductBaseResponse.prototype, "barcode", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], ProductBaseResponse.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(2),
    tslib_1.__metadata("design:type", Number)
], ProductBaseResponse.prototype, "status", void 0);
ProductBaseResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], ProductBaseResponse);
exports.ProductBaseResponse = ProductBaseResponse;
let ProductDetailResponse = class ProductDetailResponse extends BaseProduct {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], ProductDetailResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsObject(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => index_1.LocationResponse),
    tslib_1.__metadata("design:type", index_1.LocationResponse)
], ProductDetailResponse.prototype, "location", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => index_1.CertificationAbleResponse),
    tslib_1.__metadata("design:type", Array)
], ProductDetailResponse.prototype, "certificationAbles", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => index_1.MediaBaseResponse),
    tslib_1.__metadata("design:type", Array)
], ProductDetailResponse.prototype, "medias", void 0);
ProductDetailResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], ProductDetailResponse);
exports.ProductDetailResponse = ProductDetailResponse;
let ProductPortalResponse = class ProductPortalResponse extends ProductBaseResponse {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => index_1.FarmBaseResponse),
    tslib_1.__metadata("design:type", index_1.FarmBaseResponse)
], ProductPortalResponse.prototype, "farm", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsObject(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => index_1.LocationResponse),
    tslib_1.__metadata("design:type", index_1.LocationResponse)
], ProductPortalResponse.prototype, "location", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => index_1.CertificationAbleResponse),
    tslib_1.__metadata("design:type", Array)
], ProductPortalResponse.prototype, "certificationAbles", void 0);
ProductPortalResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], ProductPortalResponse);
exports.ProductPortalResponse = ProductPortalResponse;
//# sourceMappingURL=ProductResponse.js.map