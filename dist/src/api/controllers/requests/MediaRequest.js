"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMediaBody = exports.CreateMediaBaseBody = exports.CreateMediaBody = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const responses_1 = require("../responses");
class CreateMediaBody extends responses_1.BaseMedia {
}
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateMediaBody.prototype, "targetType", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], CreateMediaBody.prototype, "targetID", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateMediaBody.prototype, "createdAt", void 0);
exports.CreateMediaBody = CreateMediaBody;
class CreateMediaBaseBody {
}
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(2),
    tslib_1.__metadata("design:type", Number)
], CreateMediaBaseBody.prototype, "type", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], CreateMediaBaseBody.prototype, "url", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], CreateMediaBaseBody.prototype, "urlThumbnail", void 0);
exports.CreateMediaBaseBody = CreateMediaBaseBody;
class UpdateMediaBody {
}
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], UpdateMediaBody.prototype, "type", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], UpdateMediaBody.prototype, "url", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], UpdateMediaBody.prototype, "urlThumbnail", void 0);
exports.UpdateMediaBody = UpdateMediaBody;
//# sourceMappingURL=MediaRequest.js.map