"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class StepNotFoundError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, 'Step not found!');
    }
}
exports.StepNotFoundError = StepNotFoundError;
//# sourceMappingURL=StepNotFoundError.js.map