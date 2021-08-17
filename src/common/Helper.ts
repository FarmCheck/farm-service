import { normalize } from 'normalize-diacritics';
import { getConnectionOptions } from 'typeorm';
import { env } from '../env';

export class Helper {
    public static async combineFirstCharacterAndLastWord(name: string): Promise<string | undefined> {
        if (!name || name.length === 0) {
            return undefined;
        }

        const words = name.trim().split(' ').filter(word => word);
        const length = words.length;

        if (length === 0) {
            return undefined;
        } else {
            let result = '';

            for (let i = 0; i < length - 1; ++i) {
                result += (await normalize(words[i][0])).toUpperCase();
            }

            result += (await normalize(words[length - 1])).toUpperCase();

            return result;
        }
    }

    public static async getLoadedConnectionOptions(): Promise<any> {
        const loadedConnectionOptions = await Promise.resolve(getConnectionOptions());

        return Object.assign(loadedConnectionOptions, {
            type: env.db.type as any, // See createConnection options for valid types
            host: env.db.host,
            port: env.db.port,
            username: env.db.username,
            password: env.db.password,
            database: env.db.database,
            synchronize: env.db.synchronize,
            logging: env.db.logging,
            entities: env.app.dirs.entities,
            migrations: env.app.dirs.migrations,
        });
    }
}
