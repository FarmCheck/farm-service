"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificationAbleNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class CertificationAbleNotFoundError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, 'Certification able not found!');
    }
}
exports.CertificationAbleNotFoundError = CertificationAbleNotFoundError;
//# sourceMappingURL=CertificationAbleNotFoundError.js.map