"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCache = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const winston_1 = tslib_1.__importDefault(require("winston"));
const env_1 = require("../../env");
const cacheStoreLoader_1 = require("../../loaders/cacheStoreLoader");
function useBefore(opts, request, response, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!typedi_1.Container.has(cacheStoreLoader_1.CACHE_MANAGER)) {
            return next();
        }
        const cache = typedi_1.Container.get(cacheStoreLoader_1.CACHE_MANAGER);
        if (!cache) {
            return next();
        }
        try {
            const url = request.url;
            const cacheResponse = yield cache.get(url);
            if (!cacheResponse) {
                winston_1.default.debug('[Cache]: Miss' + url);
                return next();
            }
            winston_1.default.debug('[Cache] Hit: ' + url);
            response
                .status(200)
                .json(cacheResponse);
            return;
        }
        catch (e) {
            return next();
        }
    });
}
function useAfter(opts, action, content) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!typedi_1.Container.has(cacheStoreLoader_1.CACHE_MANAGER)) {
            return content;
        }
        if (action.response.statusCode >= 400) {
            return content;
        }
        const cache = typedi_1.Container.get(cacheStoreLoader_1.CACHE_MANAGER);
        if (cache) {
            cache.set(action.request.url, content, {
                ttl: opts.ttl,
            })
                .then(() => {
                winston_1.default.debug('[Cache] saved: ' + action.request.url);
            })
                .catch((error) => {
                winston_1.default.debug('[Cache] error: ' + action.request.url + ' Error: ' + error);
            });
        }
        return content;
    });
}
function UseCache(opts = {}) {
    return (target, propKey, descriptor) => {
        if (!env_1.env.redis.caching) {
            return;
        }
        routing_controllers_1.UseBefore(useBefore.bind(useBefore, opts))(target, propKey, descriptor);
        routing_controllers_1.UseInterceptor(useAfter.bind(useAfter, opts))(target, propKey, descriptor);
        if (opts.browser_ttl) {
            routing_controllers_1.Header('Cache-Control', `max-age=${Math.min(60, opts.browser_ttl)}`)(target, propKey, descriptor);
        }
    };
}
exports.UseCache = UseCache;
//# sourceMappingURL=CacheResponseMiddleware.js.map