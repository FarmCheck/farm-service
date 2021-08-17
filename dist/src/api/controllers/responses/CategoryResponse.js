"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryResponse = exports.BaseCategory = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const index_1 = require("./index");
let BaseCategory = class BaseCategory {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseCategory.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseCategory.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], BaseCategory.prototype, "url", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], BaseCategory.prototype, "urlThumbnail", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseCategory.prototype, "note", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseCategory.prototype, "createdAt", void 0);
BaseCategory = tslib_1.__decorate([
    class_transformer_1.Exclude()
], BaseCategory);
exports.BaseCategory = BaseCategory;
let CategoryResponse = class CategoryResponse extends BaseCategory {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], CategoryResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => index_1.SubCategoryBaseResponse),
    tslib_1.__metadata("design:type", Array)
], CategoryResponse.prototype, "subCategories", void 0);
CategoryResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], CategoryResponse);
exports.CategoryResponse = CategoryResponse;
//# sourceMappingURL=CategoryResponse.js.map