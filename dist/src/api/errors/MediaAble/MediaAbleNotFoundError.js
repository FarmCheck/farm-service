"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaAbleNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class MediaAbleNotFoundError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, 'Media able not found!');
    }
}
exports.MediaAbleNotFoundError = MediaAbleNotFoundError;
//# sourceMappingURL=MediaAbleNotFoundError.js.map