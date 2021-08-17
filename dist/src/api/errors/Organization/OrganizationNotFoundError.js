"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class OrganizationNotFoundError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, 'Organization not found!');
    }
}
exports.OrganizationNotFoundError = OrganizationNotFoundError;
//# sourceMappingURL=OrganizationNotFoundError.js.map