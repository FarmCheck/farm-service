"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductObjectNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class ProductObjectNotFoundError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, 'Product object not found!');
    }
}
exports.ProductObjectNotFoundError = ProductObjectNotFoundError;
//# sourceMappingURL=ProductObjectNotFoundError.js.map