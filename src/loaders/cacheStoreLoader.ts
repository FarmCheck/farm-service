import CacheManager, { Cache } from 'cache-manager';
import RedisStore from 'cache-manager-redis-store';
import { MicroframeworkLoader } from 'microframework-w3tec';
import { Container, Token } from 'typedi';
import { env } from '../env';

export const CACHE_MANAGER = new Token<Cache>('CACHE_MANAGER');

export const cacheStoreLoader: MicroframeworkLoader = (settings) => {
    if (env.redis.caching) {
        const cacheManager = CacheManager.caching({
            store: RedisStore.create({
                url: env.redis.url,
                prefix: 'api_cache_',
            }),
            ttl: env.redis.cache_time,
        });
        Container.set(CACHE_MANAGER, cacheManager);
    }
};
