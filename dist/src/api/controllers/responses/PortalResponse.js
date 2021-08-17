"use strict";
/**
 * TODO: Move all response below to specific files
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiariesPortalResponse = exports.SectionPortalResponse = exports.StepPortalResponse = exports.ProcessPortalResponse = exports.DiaryPortalResponse = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
let DiaryPortalResponse = class DiaryPortalResponse {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], DiaryPortalResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], DiaryPortalResponse.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], DiaryPortalResponse.prototype, "description", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsArray(),
    class_validator_1.IsString({ each: true }),
    tslib_1.__metadata("design:type", Array)
], DiaryPortalResponse.prototype, "urls", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsDateString(),
    tslib_1.__metadata("design:type", String)
], DiaryPortalResponse.prototype, "createdAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", Boolean)
], DiaryPortalResponse.prototype, "isVerified", void 0);
DiaryPortalResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], DiaryPortalResponse);
exports.DiaryPortalResponse = DiaryPortalResponse;
let ProcessPortalResponse = class ProcessPortalResponse {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], ProcessPortalResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], ProcessPortalResponse.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], ProcessPortalResponse.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], ProcessPortalResponse.prototype, "status", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], ProcessPortalResponse.prototype, "createdAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], ProcessPortalResponse.prototype, "updatedAt", void 0);
ProcessPortalResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], ProcessPortalResponse);
exports.ProcessPortalResponse = ProcessPortalResponse;
let StepPortalResponse = class StepPortalResponse {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], StepPortalResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], StepPortalResponse.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], StepPortalResponse.prototype, "processID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNumber(),
    class_validator_jsonschema_1.JSONSchema({ description: 'order in process' }),
    tslib_1.__metadata("design:type", Number)
], StepPortalResponse.prototype, "order", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => DiaryPortalResponse),
    tslib_1.__metadata("design:type", Array)
], StepPortalResponse.prototype, "diaries", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], StepPortalResponse.prototype, "diariesTotal", void 0);
StepPortalResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], StepPortalResponse);
exports.StepPortalResponse = StepPortalResponse;
let SectionPortalResponse = class SectionPortalResponse {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], SectionPortalResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], SectionPortalResponse.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], SectionPortalResponse.prototype, "type", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], SectionPortalResponse.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], SectionPortalResponse.prototype, "diariesTotal", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    tslib_1.__metadata("design:type", String)
], SectionPortalResponse.prototype, "createdAt", void 0);
SectionPortalResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], SectionPortalResponse);
exports.SectionPortalResponse = SectionPortalResponse;
let DiariesPortalResponse = class DiariesPortalResponse {
    constructor(data) {
        Object.assign(this, data);
    }
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => ProcessPortalResponse),
    class_validator_1.ValidateNested(),
    tslib_1.__metadata("design:type", ProcessPortalResponse)
], DiariesPortalResponse.prototype, "process", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_transformer_1.Type(() => StepPortalResponse),
    class_validator_1.ValidateNested({ each: true }),
    tslib_1.__metadata("design:type", Array)
], DiariesPortalResponse.prototype, "steps", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => SectionPortalResponse),
    class_validator_1.ValidateNested(),
    tslib_1.__metadata("design:type", SectionPortalResponse)
], DiariesPortalResponse.prototype, "section", void 0);
DiariesPortalResponse = tslib_1.__decorate([
    class_transformer_1.Exclude(),
    tslib_1.__metadata("design:paramtypes", [Object])
], DiariesPortalResponse);
exports.DiariesPortalResponse = DiariesPortalResponse;
//# sourceMappingURL=PortalResponse.js.map