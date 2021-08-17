"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepDetailResponse = exports.StepResponse = exports.BaseStep = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const index_1 = require("./index");
let BaseStep = class BaseStep {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseStep.prototype, "processID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseStep.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], BaseStep.prototype, "isInternal", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseStep.prototype, "description", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNumber(),
    class_validator_jsonschema_1.JSONSchema({ description: 'order in process' }),
    tslib_1.__metadata("design:type", Number)
], BaseStep.prototype, "order", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], BaseStep.prototype, "diariesTotal", void 0);
BaseStep = tslib_1.__decorate([
    class_transformer_1.Exclude()
], BaseStep);
exports.BaseStep = BaseStep;
let StepResponse = class StepResponse extends BaseStep {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], StepResponse.prototype, "id", void 0);
StepResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], StepResponse);
exports.StepResponse = StepResponse;
let StepDetailResponse = class StepDetailResponse extends BaseStep {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], StepDetailResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => index_1.StepPropertyResponse),
    tslib_1.__metadata("design:type", Array)
], StepDetailResponse.prototype, "stepProperties", void 0);
StepDetailResponse = tslib_1.__decorate([
    class_transformer_1.Expose()
], StepDetailResponse);
exports.StepDetailResponse = StepDetailResponse;
//# sourceMappingURL=StepResponse.js.map