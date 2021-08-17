"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDiaryBody = exports.CreateDiaryBody = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const responses_1 = require("../responses");
class CreateDiaryBody extends responses_1.BaseDiary {
}
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], CreateDiaryBody.prototype, "productObjectID", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsOptional(),
    class_validator_1.IsDateString(),
    tslib_1.__metadata("design:type", String)
], CreateDiaryBody.prototype, "createdAt", void 0);
exports.CreateDiaryBody = CreateDiaryBody;
class UpdateDiaryBody {
}
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], UpdateDiaryBody.prototype, "stepID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], UpdateDiaryBody.prototype, "sectionID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateDiaryBody.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateDiaryBody.prototype, "description", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString({ each: true }),
    tslib_1.__metadata("design:type", Array)
], UpdateDiaryBody.prototype, "urls", void 0);
exports.UpdateDiaryBody = UpdateDiaryBody;
//# sourceMappingURL=DiaryRequest.js.map