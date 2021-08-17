"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepPropertyResponse = exports.BaseStepProperty = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let BaseStepProperty = class BaseStepProperty {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseStepProperty.prototype, "stepID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseStepProperty.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], BaseStepProperty.prototype, "isRequired", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], BaseStepProperty.prototype, "type", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseStepProperty.prototype, "value", void 0);
BaseStepProperty = tslib_1.__decorate([
    class_transformer_1.Exclude()
], BaseStepProperty);
exports.BaseStepProperty = BaseStepProperty;
let StepPropertyResponse = class StepPropertyResponse extends BaseStepProperty {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], StepPropertyResponse.prototype, "id", void 0);
StepPropertyResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], StepPropertyResponse);
exports.StepPropertyResponse = StepPropertyResponse;
//# sourceMappingURL=StepPropertyResponse.js.map