"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmCategoryNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class FarmCategoryNotFoundError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, 'Farm category not found!');
    }
}
exports.FarmCategoryNotFoundError = FarmCategoryNotFoundError;
//# sourceMappingURL=FarmCategoryNotFoundError.js.map