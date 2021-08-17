"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class ErrorResponse {
}
tslib_1.__decorate([
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], ErrorResponse.prototype, "code", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], ErrorResponse.prototype, "message", void 0);
exports.ErrorResponse = ErrorResponse;
//# sourceMappingURL=CommonResponse.js.map