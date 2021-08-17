"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationChecker = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const env_1 = require("../env");
const logger_1 = require("../lib/logger");
const AuthHelper_1 = require("./AuthHelper");
const axios_1 = tslib_1.__importDefault(require("axios"));
function getActionFromMethod(method) {
    switch (method.toLowerCase()) {
        case 'get':
            return 'get';
        case 'post':
            return 'create';
        case 'put':
        case 'path':
            return 'update';
        case 'delete':
            return 'delete';
        default:
            return 'unknown';
    }
}
function authorizationChecker(connection) {
    return function innerAuthorizationChecker(action, roles) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const logger = new logger_1.Logger(__filename);
            const isDebugHeader = action.request.headers['is-debug'];
            // ignore check token for quick debug
            if (env_1.env.node === 'development' && isDebugHeader) {
                return true;
            }
            try {
                // @ts-ignore
                // tslint:disable-next-line:prefer-const
                let controller = action.request.url.replace(env_1.env.app.routePrefix + '/', '').split('/', 2)[0];
                controller = controller.split('?')[0];
                // @ts-ignore
                const [_2, token] = action.request.headers.authorization.split(' ', 2);
                const jwtPayload = AuthHelper_1.AuthHelper.getPayloadFromJWT(token);
                if (!controller || !token) {
                    return false;
                }
                const method = getActionFromMethod(action.request.method);
                const permission = `farm.${jwtPayload.farmID}.${controller}.${method}`;
                logger.info(`make POST ${env_1.env.farmhub.identityService}permission/verify?action=${permission}`);
                yield axios_1.default.create({ baseURL: env_1.env.farmhub.identityService })({
                    url: '/permission/verify',
                    headers: { authorization: `Bearer ${token}` },
                    method: 'POST',
                    params: { action: permission },
                });
            }
            catch (resError) {
                if (resError.response) {
                    logger.error(`[Identity Service response] ${resError.response.status} ${resError.response.data.message}`);
                    action.response.status(resError.response.status);
                    throw new routing_controllers_1.HttpError(resError.response.status, resError.response.data.message);
                }
                else {
                    logger.error(resError.stack);
                    return false;
                }
            }
            return true;
        });
    };
}
exports.authorizationChecker = authorizationChecker;
//# sourceMappingURL=authorizationChecker.js.map