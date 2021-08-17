"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const tslib_1 = require("tslib");
const dotenv = tslib_1.__importStar(require("dotenv"));
const path = tslib_1.__importStar(require("path"));
const pkg = tslib_1.__importStar(require("../package.json"));
const env_1 = require("./lib/env");
/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({
    path: path.join(process.cwd(), `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`),
});
/**
 * Environment variables
 */
exports.env = {
    node: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    isDevelopment: process.env.NODE_ENV === 'development',
    app: {
        name: env_1.getOsEnv('APP_NAME'),
        version: pkg.version,
        description: pkg.description,
        host: env_1.getOsEnv('APP_HOST'),
        schema: env_1.getOsEnv('APP_SCHEMA'),
        routePrefix: env_1.getOsEnv('APP_ROUTE_PREFIX'),
        port: env_1.normalizePort(process.env.PORT || env_1.getOsEnv('APP_PORT')),
        banner: env_1.toBool(env_1.getOsEnv('APP_BANNER')),
        dirs: {
            migrations: env_1.getOsPaths('TYPEORM_MIGRATIONS'),
            migrationsDir: env_1.getOsPath('TYPEORM_MIGRATIONS_DIR'),
            entities: env_1.getOsPaths('TYPEORM_ENTITIES'),
            entitiesDir: env_1.getOsPath('TYPEORM_ENTITIES_DIR'),
            controllers: env_1.getOsPaths('CONTROLLERS'),
            middlewares: env_1.getOsPaths('MIDDLEWARES'),
            interceptors: env_1.getOsPaths('INTERCEPTORS'),
            subscribers: env_1.getOsPaths('SUBSCRIBERS'),
            resolvers: env_1.getOsPaths('RESOLVERS'),
        },
    },
    farmhub: {
        productService: env_1.getOsEnv('PRODUCT_SERVICE'),
        userService: env_1.getOsEnv('USER_SERVICE'),
        pushLogService: env_1.getOsEnv('PUSH_LOG_SERVICE'),
        identityService: env_1.getOsEnv('IDENTITY_SERVICE'),
    },
    log: {
        level: env_1.getOsEnv('LOG_LEVEL'),
        json: env_1.toBool(env_1.getOsEnvOptional('LOG_JSON')),
        output: env_1.getOsEnv('LOG_OUTPUT'),
        logDriver: env_1.getOsEnv('LOG_DRIVER'),
        logDir: env_1.getOsEnv('LOG_DIR'),
        logMaxSize: env_1.getOsEnv('MAX_SIZE'),
    },
    db: {
        type: env_1.getOsEnv('TYPEORM_CONNECTION'),
        host: env_1.getOsEnvOptional('TYPEORM_HOST'),
        port: env_1.toNumber(env_1.getOsEnvOptional('TYPEORM_PORT')),
        username: env_1.getOsEnvOptional('TYPEORM_USERNAME'),
        password: env_1.getOsEnvOptional('TYPEORM_PASSWORD'),
        database: env_1.getOsEnv('TYPEORM_DATABASE'),
        synchronize: env_1.toBool(env_1.getOsEnvOptional('TYPEORM_SYNCHRONIZE')),
        logging: env_1.getOsEnv('TYPEORM_LOGGING'),
        logger: env_1.getOsEnv('TYPEORM_LOGGER'),
        defaultPageSize: env_1.getOsEnv('TYPEORM_DEFAULT_PAGE_SIZE'),
    },
    graphql: {
        enabled: env_1.toBool(env_1.getOsEnv('GRAPHQL_ENABLED')),
        route: env_1.getOsEnv('GRAPHQL_ROUTE'),
        editor: env_1.toBool(env_1.getOsEnv('GRAPHQL_EDITOR')),
    },
    swagger: {
        enabled: env_1.toBool(env_1.getOsEnv('SWAGGER_ENABLED')),
        route: env_1.getOsEnv('SWAGGER_ROUTE'),
        username: env_1.getOsEnv('SWAGGER_USERNAME'),
        password: env_1.getOsEnv('SWAGGER_PASSWORD'),
    },
    monitor: {
        enabled: env_1.toBool(env_1.getOsEnv('MONITOR_ENABLED')),
        route: env_1.getOsEnv('MONITOR_ROUTE'),
        username: env_1.getOsEnv('MONITOR_USERNAME'),
        password: env_1.getOsEnv('MONITOR_PASSWORD'),
    },
    blockchain: {
        uris: env_1.getOsEnv('TENDERMINT_URIS').split(',').map(uri => uri.trim()),
    },
    redis: {
        caching: env_1.getOsEnvOptional('REDIS_CACHING') === 'true',
        url: env_1.getOsEnvOptional('REDIS_URL'),
        cache_time: +(env_1.getOsEnvOptional('REDIS_CACHE_TIME') || 1000),
    },
};
//# sourceMappingURL=env.js.map