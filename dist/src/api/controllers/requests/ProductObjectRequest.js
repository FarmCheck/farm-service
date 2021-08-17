"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductObjectBody = exports.CreateProductObjectBody = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const index_1 = require("./index");
const responses_1 = require("../responses");
class CreateProductObjectBody extends responses_1.BaseProductObject {
}
tslib_1.__decorate([
    class_validator_1.IsArray(),
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => index_1.CreateMediaBaseBody),
    tslib_1.__metadata("design:type", Array)
], CreateProductObjectBody.prototype, "medias", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateProductObjectBody.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(2),
    tslib_1.__metadata("design:type", Number)
], CreateProductObjectBody.prototype, "status", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateProductObjectBody.prototype, "createdAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateProductObjectBody.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateProductObjectBody.prototype, "deletedAt", void 0);
exports.CreateProductObjectBody = CreateProductObjectBody;
class UpdateProductObjectBody {
}
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], UpdateProductObjectBody.prototype, "processID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], UpdateProductObjectBody.prototype, "areaID", void 0);
tslib_1.__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateProductObjectBody.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateProductObjectBody.prototype, "name", void 0);
tslib_1.__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], UpdateProductObjectBody.prototype, "type", void 0);
tslib_1.__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], UpdateProductObjectBody.prototype, "objectType", void 0);
tslib_1.__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateProductObjectBody.prototype, "description", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(2),
    tslib_1.__metadata("design:type", Number)
], UpdateProductObjectBody.prototype, "status", void 0);
exports.UpdateProductObjectBody = UpdateProductObjectBody;
//# sourceMappingURL=ProductObjectRequest.js.map