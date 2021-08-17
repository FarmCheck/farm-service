"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmPaymentBadRequestError = void 0;
const routing_controllers_1 = require("routing-controllers");
class FarmPaymentBadRequestError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, 'Farm payment bad request!');
    }
}
exports.FarmPaymentBadRequestError = FarmPaymentBadRequestError;
//# sourceMappingURL=FarmPaymentBadRequestError.js.map