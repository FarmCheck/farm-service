"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmPaymentNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class FarmPaymentNotFoundError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, 'Farm payment not found!');
    }
}
exports.FarmPaymentNotFoundError = FarmPaymentNotFoundError;
//# sourceMappingURL=FarmPaymentNotFoundError.js.map