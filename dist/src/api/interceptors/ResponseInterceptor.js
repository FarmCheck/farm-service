"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseInterceptor = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
let ResponseInterceptor = class ResponseInterceptor {
    intercept(action, content) {
        if (content === undefined || content === null || content === []) {
            return undefined;
        }
        if (Object.keys(content).length === 0) {
            return { code: 200 };
        }
        return { code: 200, data: content };
    }
};
ResponseInterceptor = tslib_1.__decorate([
    routing_controllers_1.Interceptor()
], ResponseInterceptor);
exports.ResponseInterceptor = ResponseInterceptor;
//# sourceMappingURL=ResponseInterceptor.js.map