"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificationNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class CertificationNotFoundError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, 'Certification not found!');
    }
}
exports.CertificationNotFoundError = CertificationNotFoundError;
//# sourceMappingURL=CertificationNotFoundError.js.map