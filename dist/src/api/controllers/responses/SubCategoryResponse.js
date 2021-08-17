"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryBaseResponse = exports.SubCategoryResponse = exports.BaseSubCategory = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let BaseSubCategory = class BaseSubCategory {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseSubCategory.prototype, "categoryID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseSubCategory.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseSubCategory.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], BaseSubCategory.prototype, "url", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], BaseSubCategory.prototype, "urlThumbnail", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseSubCategory.prototype, "note", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsDateString(),
    tslib_1.__metadata("design:type", String)
], BaseSubCategory.prototype, "createdAt", void 0);
BaseSubCategory = tslib_1.__decorate([
    class_transformer_1.Exclude()
], BaseSubCategory);
exports.BaseSubCategory = BaseSubCategory;
let SubCategoryResponse = class SubCategoryResponse extends BaseSubCategory {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], SubCategoryResponse.prototype, "id", void 0);
SubCategoryResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], SubCategoryResponse);
exports.SubCategoryResponse = SubCategoryResponse;
let SubCategoryBaseResponse = class SubCategoryBaseResponse {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], SubCategoryBaseResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], SubCategoryBaseResponse.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], SubCategoryBaseResponse.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], SubCategoryBaseResponse.prototype, "urlThumbnail", void 0);
SubCategoryBaseResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], SubCategoryBaseResponse);
exports.SubCategoryBaseResponse = SubCategoryBaseResponse;
//# sourceMappingURL=SubCategoryResponse.js.map