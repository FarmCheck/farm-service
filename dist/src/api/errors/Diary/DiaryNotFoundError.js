"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class DiaryNotFoundError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, 'Diary not found!');
    }
}
exports.DiaryNotFoundError = DiaryNotFoundError;
//# sourceMappingURL=DiaryNotFoundError.js.map