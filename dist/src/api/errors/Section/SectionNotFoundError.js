"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class SectionNotFoundError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, 'Section not found!');
    }
}
exports.SectionNotFoundError = SectionNotFoundError;
//# sourceMappingURL=SectionNotFoundError.js.map