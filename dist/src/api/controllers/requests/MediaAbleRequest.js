"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMediaAbleBody = exports.CreateMediaAbleBody = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const responses_1 = require("../responses");
class CreateMediaAbleBody extends responses_1.BaseMediaAble {
}
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateMediaAbleBody.prototype, "targetType", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], CreateMediaAbleBody.prototype, "targetTypeID", void 0);
exports.CreateMediaAbleBody = CreateMediaAbleBody;
class UpdateMediaAbleBody {
}
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateMediaAbleBody.prototype, "targetType", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], UpdateMediaAbleBody.prototype, "targetID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], UpdateMediaAbleBody.prototype, "MediaID", void 0);
exports.UpdateMediaAbleBody = UpdateMediaAbleBody;
//# sourceMappingURL=MediaAbleRequest.js.map