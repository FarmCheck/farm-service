"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepPropertyNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class StepPropertyNotFoundError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, 'Step property not found!');
    }
}
exports.StepPropertyNotFoundError = StepPropertyNotFoundError;
//# sourceMappingURL=StepPropertyNotFoundError.js.map