"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheStoreLoader = exports.CACHE_MANAGER = void 0;
const tslib_1 = require("tslib");
const cache_manager_1 = tslib_1.__importDefault(require("cache-manager"));
const cache_manager_redis_store_1 = tslib_1.__importDefault(require("cache-manager-redis-store"));
const typedi_1 = require("typedi");
const env_1 = require("../env");
exports.CACHE_MANAGER = new typedi_1.Token('CACHE_MANAGER');
const cacheStoreLoader = (settings) => {
    if (env_1.env.redis.caching) {
        const cacheManager = cache_manager_1.default.caching({
            store: cache_manager_redis_store_1.default.create({
                url: env_1.env.redis.url,
                prefix: 'api_cache_',
            }),
            ttl: env_1.env.redis.cache_time,
        });
        typedi_1.Container.set(exports.CACHE_MANAGER, cacheManager);
    }
};
exports.cacheStoreLoader = cacheStoreLoader;
//# sourceMappingURL=cacheStoreLoader.js.map