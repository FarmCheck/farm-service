"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSubCategoryBody = exports.CreateSubCategoryBody = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const responses_1 = require("../responses");
class CreateSubCategoryBody extends responses_1.BaseSubCategory {
}
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateSubCategoryBody.prototype, "createdAt", void 0);
exports.CreateSubCategoryBody = CreateSubCategoryBody;
class UpdateSubCategoryBody {
}
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], UpdateSubCategoryBody.prototype, "categoryID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateSubCategoryBody.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateSubCategoryBody.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], UpdateSubCategoryBody.prototype, "url", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], UpdateSubCategoryBody.prototype, "urlThumbnail", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateSubCategoryBody.prototype, "note", void 0);
exports.UpdateSubCategoryBody = UpdateSubCategoryBody;
//# sourceMappingURL=SubCategoryRequest.js.map