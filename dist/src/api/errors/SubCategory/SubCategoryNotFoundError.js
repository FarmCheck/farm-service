"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class SubCategoryNotFoundError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, 'Sub category not found!');
    }
}
exports.SubCategoryNotFoundError = SubCategoryNotFoundError;
//# sourceMappingURL=SubCategoryNotFoundError.js.map