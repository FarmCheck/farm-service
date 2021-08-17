"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserChecker = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const AuthHelper_1 = require("./AuthHelper");
const logger_1 = require("../lib/logger");
function currentUserChecker(connection) {
    return function innerCurrentUserChecker(action) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const log = new logger_1.Logger(__filename);
            try {
                // @ts-ignore
                const [_, token] = action.request.headers.authorization.split(' ', 2);
                return AuthHelper_1.AuthHelper.getPayloadFromJWT(token);
            }
            catch (error) {
                log.error(error.stack);
                throw new routing_controllers_1.HttpError(401, 'Invalid token');
            }
        });
    };
}
exports.currentUserChecker = currentUserChecker;
//# sourceMappingURL=currentUserChecker.js.map