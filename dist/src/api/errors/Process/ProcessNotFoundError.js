"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class ProcessNotFoundError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, 'Process not found!');
    }
}
exports.ProcessNotFoundError = ProcessNotFoundError;
//# sourceMappingURL=ProcessNotFoundError.js.map