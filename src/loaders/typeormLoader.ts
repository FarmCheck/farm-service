import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { ConnectionOptions, createConnection, getConnectionOptions } from 'typeorm';

import { env } from '../env';

export const typeormLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {

    const loadedConnectionOptions = await getConnectionOptions();

    const connectionOptions = Object.assign(loadedConnectionOptions, {
        type: env.db.type as any, // See createConnection options for valid types
        host: env.db.host,
        port: env.db.port,
        username: env.db.username,
        password: env.db.password,
        database: env.db.database,
        synchronize: env.db.synchronize,
        logging: env.db.logging === 'true' ? true : env.db.logging,
        logger: env.db.logger,
        entities: env.app.dirs.entities,
        migrations: env.app.dirs.migrations,
        cache: env.redis.caching ? {
            type: 'redis',
            options: {
                url: env.redis.url,
            },
            ignoreErrors: true,
            duration: env.redis.cache_time,
        } : false,
    } as ConnectionOptions);
    const connection = await createConnection(connectionOptions);

    if (settings) {
        settings.setData('connection', connection);
        settings.onShutdown(() => connection.close());
    }
};
