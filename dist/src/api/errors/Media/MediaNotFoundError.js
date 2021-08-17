"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class MediaNotFoundError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, 'Media not found!');
    }
}
exports.MediaNotFoundError = MediaNotFoundError;
//# sourceMappingURL=MediaNotFoundError.js.map