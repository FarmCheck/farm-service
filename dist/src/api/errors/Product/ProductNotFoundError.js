"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class ProductNotFoundError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, 'Category not found!');
    }
}
exports.ProductNotFoundError = ProductNotFoundError;
//# sourceMappingURL=ProductNotFoundError.js.map