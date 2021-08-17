"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class AreaNotFoundError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, 'Area not found!');
    }
}
exports.AreaNotFoundError = AreaNotFoundError;
//# sourceMappingURL=AreaNotFoundError.js.map