"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class CategoryNotFoundError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, 'Category not found!');
    }
}
exports.CategoryNotFoundError = CategoryNotFoundError;
//# sourceMappingURL=CategoryNotFoundError.js.map