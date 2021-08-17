"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetTypeResponse = exports.BaseTargetType = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let BaseTargetType = class BaseTargetType {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseTargetType.prototype, "name", void 0);
BaseTargetType = tslib_1.__decorate([
    class_transformer_1.Exclude()
], BaseTargetType);
exports.BaseTargetType = BaseTargetType;
let TargetTypeResponse = class TargetTypeResponse extends BaseTargetType {
};
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], TargetTypeResponse.prototype, "id", void 0);
TargetTypeResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], TargetTypeResponse);
exports.TargetTypeResponse = TargetTypeResponse;
//# sourceMappingURL=TargetTypeResponse.js.map