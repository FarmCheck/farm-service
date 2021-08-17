import { NextFunction, Request, Response } from 'express';
import { Action, Header, UseBefore, UseInterceptor } from 'routing-controllers';
import { Container } from 'typedi';
import winstonLogger from 'winston';
import { env } from '../../env';
import { CACHE_MANAGER } from '../../loaders/cacheStoreLoader';

interface CacheOptions {
    /** Time To Live in seconds */
    ttl?: number;
    browser_ttl?: number;
}

async function useBefore(opts: CacheOptions, request: Request, response: Response, next: NextFunction): Promise<void> {
    if (!Container.has(CACHE_MANAGER)) {
        return next();
    }

    const cache = Container.get(CACHE_MANAGER);

    if (!cache) {
        return next();
    }
    try {
        const url = request.url;
        const cacheResponse = await cache.get<string>(url);
        if (!cacheResponse) {
            winstonLogger.debug('[Cache]: Miss' + url);
            return next();
        }
        winstonLogger.debug('[Cache] Hit: ' + url);
        response
            .status(200)
            .json(cacheResponse);
        return;
    } catch (e: any) {
        return next();
    }
}

async function useAfter(opts: CacheOptions, action: Action, content: any): Promise<any> {
    if (!Container.has(CACHE_MANAGER)) {
        return content;
    }

    if (action.response.statusCode >= 400) {
        return content;
    }
    const cache = Container.get(CACHE_MANAGER);
    if (cache) {
        cache.set(action.request.url, content, {
            ttl: opts.ttl,
        })
        .then(() => {
            winstonLogger.debug('[Cache] saved: ' + action.request.url);
        })
        .catch((error) => {
            winstonLogger.debug('[Cache] error: ' + action.request.url + ' Error: ' + error);
        });
    }

    return content;
}

export function UseCache(opts: CacheOptions = {}): MethodDecorator {
    return (target, propKey, descriptor) => {
        if (!env.redis.caching) {
            return;
        }
        UseBefore(useBefore.bind(useBefore, opts))(target, propKey, descriptor);
        UseInterceptor(useAfter.bind(useAfter, opts))(target, propKey, descriptor);
        if (opts.browser_ttl) {
            Header('Cache-Control', `max-age=${Math.min(60, opts.browser_ttl)}`)(
                target,
                propKey,
                descriptor
            );
        }
    };
}
