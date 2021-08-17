"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaAbleResponse = exports.BaseMediaAble = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let BaseMediaAble = class BaseMediaAble {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseMediaAble.prototype, "targetID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseMediaAble.prototype, "targetTypeID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseMediaAble.prototype, "MediaID", void 0);
BaseMediaAble = tslib_1.__decorate([
    class_transformer_1.Exclude()
], BaseMediaAble);
exports.BaseMediaAble = BaseMediaAble;
let MediaAbleResponse = class MediaAbleResponse extends BaseMediaAble {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], MediaAbleResponse.prototype, "id", void 0);
MediaAbleResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], MediaAbleResponse);
exports.MediaAbleResponse = MediaAbleResponse;
//# sourceMappingURL=MediaAbleResponse.js.map