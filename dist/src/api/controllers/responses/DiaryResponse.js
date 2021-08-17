"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryBaseResponse = exports.DiaryResponse = exports.BaseDiary = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let BaseDiary = class BaseDiary {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseDiary.prototype, "stepID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseDiary.prototype, "sectionID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseDiary.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseDiary.prototype, "description", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString({ each: true }),
    tslib_1.__metadata("design:type", Array)
], BaseDiary.prototype, "urls", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", Boolean)
], BaseDiary.prototype, "isVerified", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsDateString(),
    tslib_1.__metadata("design:type", String)
], BaseDiary.prototype, "createdAt", void 0);
BaseDiary = tslib_1.__decorate([
    class_transformer_1.Exclude()
], BaseDiary);
exports.BaseDiary = BaseDiary;
let DiaryResponse = class DiaryResponse extends BaseDiary {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], DiaryResponse.prototype, "id", void 0);
DiaryResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], DiaryResponse);
exports.DiaryResponse = DiaryResponse;
let DiaryBaseResponse = class DiaryBaseResponse {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], DiaryBaseResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], DiaryBaseResponse.prototype, "sectionID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], DiaryBaseResponse.prototype, "stepID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], DiaryBaseResponse.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], DiaryBaseResponse.prototype, "description", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsArray(),
    class_validator_1.IsString({ each: true }),
    tslib_1.__metadata("design:type", Array)
], DiaryBaseResponse.prototype, "urls", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsDateString(),
    tslib_1.__metadata("design:type", String)
], DiaryBaseResponse.prototype, "createdAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", Boolean)
], DiaryBaseResponse.prototype, "isVerified", void 0);
DiaryBaseResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], DiaryBaseResponse);
exports.DiaryBaseResponse = DiaryBaseResponse;
//# sourceMappingURL=DiaryResponse.js.map