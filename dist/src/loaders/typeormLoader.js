"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeormLoader = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const env_1 = require("../env");
const typeormLoader = (settings) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const loadedConnectionOptions = yield typeorm_1.getConnectionOptions();
    const connectionOptions = Object.assign(loadedConnectionOptions, {
        type: env_1.env.db.type,
        host: env_1.env.db.host,
        port: env_1.env.db.port,
        username: env_1.env.db.username,
        password: env_1.env.db.password,
        database: env_1.env.db.database,
        synchronize: env_1.env.db.synchronize,
        logging: env_1.env.db.logging === 'true' ? true : env_1.env.db.logging,
        logger: env_1.env.db.logger,
        entities: env_1.env.app.dirs.entities,
        migrations: env_1.env.app.dirs.migrations,
        cache: env_1.env.redis.caching ? {
            type: 'redis',
            options: {
                url: env_1.env.redis.url,
            },
            ignoreErrors: true,
            duration: env_1.env.redis.cache_time,
        } : false,
    });
    const connection = yield typeorm_1.createConnection(connectionOptions);
    if (settings) {
        settings.setData('connection', connection);
        settings.onShutdown(() => connection.close());
    }
});
exports.typeormLoader = typeormLoader;
//# sourceMappingURL=typeormLoader.js.map