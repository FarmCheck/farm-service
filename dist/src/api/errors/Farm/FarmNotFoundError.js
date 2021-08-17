"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class FarmNotFoundError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, 'Farm not found!');
    }
}
exports.FarmNotFoundError = FarmNotFoundError;
//# sourceMappingURL=FarmNotFoundError.js.map