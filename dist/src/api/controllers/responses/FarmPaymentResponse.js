"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmPaymentResponse = exports.BaseFarmPayment = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let BaseFarmPayment = class BaseFarmPayment {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseFarmPayment.prototype, "farmID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], BaseFarmPayment.prototype, "type", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseFarmPayment.prototype, "provider", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseFarmPayment.prototype, "accountNo", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsDateString(),
    tslib_1.__metadata("design:type", String)
], BaseFarmPayment.prototype, "expiredAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], BaseFarmPayment.prototype, "status", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseFarmPayment.prototype, "createdAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseFarmPayment.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseFarmPayment.prototype, "deletedAt", void 0);
BaseFarmPayment = tslib_1.__decorate([
    class_transformer_1.Exclude()
], BaseFarmPayment);
exports.BaseFarmPayment = BaseFarmPayment;
let FarmPaymentResponse = class FarmPaymentResponse extends BaseFarmPayment {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], FarmPaymentResponse.prototype, "id", void 0);
FarmPaymentResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], FarmPaymentResponse);
exports.FarmPaymentResponse = FarmPaymentResponse;
//# sourceMappingURL=FarmPaymentResponse.js.map