"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTargetTypeBody = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
// class CreateTargetTypeBody extends BaseTargetType {}
class UpdateTargetTypeBody {
}
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateTargetTypeBody.prototype, "name", void 0);
exports.UpdateTargetTypeBody = UpdateTargetTypeBody;
//# sourceMappingURL=TargetTypeRequest.js.map