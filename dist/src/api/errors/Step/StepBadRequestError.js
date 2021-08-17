"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepBadRequestError = void 0;
const routing_controllers_1 = require("routing-controllers");
class StepBadRequestError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, 'Step bad request!');
    }
}
exports.StepBadRequestError = StepBadRequestError;
//# sourceMappingURL=StepBadRequestError.js.map