"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStepBody = exports.CreateStepBody = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const index_1 = require("./index");
const responses_1 = require("../responses");
// 0: 'text', 1: 'number', 2: 'link'
class CreateStepBody extends responses_1.BaseStep {
}
tslib_1.__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => index_1.CreateStepPropertyBody),
    tslib_1.__metadata("design:type", Array)
], CreateStepBody.prototype, "stepProperties", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", Number)
], CreateStepBody.prototype, "diariesTotal", void 0);
exports.CreateStepBody = CreateStepBody;
class UpdateStepBody {
}
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], UpdateStepBody.prototype, "processID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateStepBody.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], UpdateStepBody.prototype, "isInternal", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateStepBody.prototype, "description", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", Number)
], UpdateStepBody.prototype, "diariesTotal", void 0);
exports.UpdateStepBody = UpdateStepBody;
//# sourceMappingURL=StepRequest.js.map