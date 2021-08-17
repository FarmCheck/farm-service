"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetTypeNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class TargetTypeNotFoundError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, 'Target type not found!');
    }
}
exports.TargetTypeNotFoundError = TargetTypeNotFoundError;
//# sourceMappingURL=TargetTypeNotFoundError.js.map