"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductBody = exports.CreateProductBody = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const index_1 = require("./index");
const responses_1 = require("../responses");
class CreateProductBody extends responses_1.BaseProduct {
}
tslib_1.__decorate([
    class_validator_1.IsArray(),
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => index_1.CreateMediaBaseBody),
    tslib_1.__metadata("design:type", Array)
], CreateProductBody.prototype, "medias", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], CreateProductBody.prototype, "productObjectsTotal", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateProductBody.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], CreateProductBody.prototype, "isVerifiedPhoneNumber", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(2),
    tslib_1.__metadata("design:type", Number)
], CreateProductBody.prototype, "status", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateProductBody.prototype, "createdAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateProductBody.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateProductBody.prototype, "deletedAt", void 0);
exports.CreateProductBody = CreateProductBody;
class UpdateProductBody {
}
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], UpdateProductBody.prototype, "locationID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], UpdateProductBody.prototype, "subCategoryID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(13, 13),
    tslib_1.__metadata("design:type", String)
], UpdateProductBody.prototype, "barcode", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateProductBody.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateProductBody.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], UpdateProductBody.prototype, "unit", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateProductBody.prototype, "description", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], UpdateProductBody.prototype, "duration", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], UpdateProductBody.prototype, "durationType", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], UpdateProductBody.prototype, "price", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], UpdateProductBody.prototype, "isHaveBrand", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateProductBody.prototype, "brandName", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateProductBody.prototype, "brandDescription", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(14, 14),
    class_validator_1.Contains('-'),
    tslib_1.__metadata("design:type", String)
], UpdateProductBody.prototype, "taxCode", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateProductBody.prototype, "email", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateProductBody.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], UpdateProductBody.prototype, "isVerifiedPhoneNumber", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], UpdateProductBody.prototype, "website", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], UpdateProductBody.prototype, "logo", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], UpdateProductBody.prototype, "banner", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateProductBody.prototype, "address", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsLatitude(),
    tslib_1.__metadata("design:type", String)
], UpdateProductBody.prototype, "latitude", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsLongitude(),
    tslib_1.__metadata("design:type", String)
], UpdateProductBody.prototype, "longitude", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(2),
    tslib_1.__metadata("design:type", Number)
], UpdateProductBody.prototype, "status", void 0);
exports.UpdateProductBody = UpdateProductBody;
//# sourceMappingURL=ProductRequest.js.map