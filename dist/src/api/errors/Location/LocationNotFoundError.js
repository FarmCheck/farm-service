"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationNotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
class LocationNotFoundError extends routing_controllers_1.HttpError {
    constructor() {
        super(404, 'Location not found!');
    }
}
exports.LocationNotFoundError = LocationNotFoundError;
//# sourceMappingURL=LocationNotFoundError.js.map