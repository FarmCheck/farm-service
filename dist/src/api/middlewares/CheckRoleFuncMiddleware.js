"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = exports.CheckRoleFuncMiddleware = void 0;
const AuthHelper_1 = require("../../auth/AuthHelper");
const routing_controllers_1 = require("routing-controllers");
const logger_1 = require("../../lib/logger");
function CheckRoleFuncMiddleware(role) {
    return (req, res, next) => {
        const log = new logger_1.Logger(__filename);
        try {
            const token = req.headers.authorization.split(' ', 2)[1];
            const payload = AuthHelper_1.AuthHelper.getPayloadFromJWT(token);
            if (!payload.kind || payload.kind !== role) {
                throw new Error('Permission denied');
            }
            return next();
        }
        catch (error) {
            log.error(error.stack);
            throw new routing_controllers_1.HttpError(403, 'Permission denied');
        }
    };
}
exports.CheckRoleFuncMiddleware = CheckRoleFuncMiddleware;
exports.UserRoles = {
    admin: 'admin',
};
//# sourceMappingURL=CheckRoleFuncMiddleware.js.map