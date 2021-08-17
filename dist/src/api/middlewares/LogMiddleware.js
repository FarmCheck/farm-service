"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogMiddleware = void 0;
const tslib_1 = require("tslib");
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const routing_controllers_1 = require("routing-controllers");
const env_1 = require("../../env");
const logger_1 = require("../../lib/logger");
let LogMiddleware = class LogMiddleware {
    constructor() {
        this.log = new logger_1.Logger(__filename);
    }
    use(req, res, next) {
        const requestLog = {
            remoteAddress: req.ip,
            method: req.method,
            path: req.path,
            headers: req.headers,
            query: req.query,
            body: req.body,
        };
        this.log.info('Request detail: \n' + JSON.stringify(requestLog));
        return morgan_1.default(env_1.env.log.output, {
            stream: {
                write: this.log.info.bind(this.log),
            },
        })(req, res, next);
    }
};
LogMiddleware = tslib_1.__decorate([
    routing_controllers_1.Middleware({ type: 'before', priority: 9 })
], LogMiddleware);
exports.LogMiddleware = LogMiddleware;
//# sourceMappingURL=LogMiddleware.js.map