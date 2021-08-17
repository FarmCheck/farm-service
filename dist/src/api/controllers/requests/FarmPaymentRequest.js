"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFarmPaymentBody = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
// class CreateFarmPaymentBody extends BaseFarmPayment {}
class UpdateFarmPaymentBody {
}
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], UpdateFarmPaymentBody.prototype, "farmID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], UpdateFarmPaymentBody.prototype, "type", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateFarmPaymentBody.prototype, "provider", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateFarmPaymentBody.prototype, "accountNo", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], UpdateFarmPaymentBody.prototype, "expiredAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], UpdateFarmPaymentBody.prototype, "status", void 0);
exports.UpdateFarmPaymentBody = UpdateFarmPaymentBody;
//# sourceMappingURL=FarmPaymentRequest.js.map