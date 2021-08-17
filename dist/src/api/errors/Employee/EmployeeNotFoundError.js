"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class EmployeeNotFoundError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, 'Employee not found!');
    }
}
exports.EmployeeNotFoundError = EmployeeNotFoundError;
//# sourceMappingURL=EmployeeNotFoundError.js.map