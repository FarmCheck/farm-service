"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaBaseResponse = exports.MediaResponse = exports.BaseMedia = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let BaseMedia = class BaseMedia {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], BaseMedia.prototype, "type", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], BaseMedia.prototype, "url", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], BaseMedia.prototype, "urlThumbnail", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseMedia.prototype, "createdAt", void 0);
BaseMedia = tslib_1.__decorate([
    class_transformer_1.Exclude()
], BaseMedia);
exports.BaseMedia = BaseMedia;
let MediaResponse = class MediaResponse extends BaseMedia {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], MediaResponse.prototype, "id", void 0);
MediaResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], MediaResponse);
exports.MediaResponse = MediaResponse;
let MediaBaseResponse = class MediaBaseResponse {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], MediaBaseResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], MediaBaseResponse.prototype, "urlThumbnail", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], MediaBaseResponse.prototype, "url", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], MediaBaseResponse.prototype, "type", void 0);
MediaBaseResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], MediaBaseResponse);
exports.MediaBaseResponse = MediaBaseResponse;
//# sourceMappingURL=MediaResponse.js.map