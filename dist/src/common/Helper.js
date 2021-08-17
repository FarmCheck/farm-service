"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
const tslib_1 = require("tslib");
const normalize_diacritics_1 = require("normalize-diacritics");
const typeorm_1 = require("typeorm");
const env_1 = require("../env");
class Helper {
    static combineFirstCharacterAndLastWord(name) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!name || name.length === 0) {
                return undefined;
            }
            const words = name.trim().split(' ').filter(word => word);
            const length = words.length;
            if (length === 0) {
                return undefined;
            }
            else {
                let result = '';
                for (let i = 0; i < length - 1; ++i) {
                    result += (yield normalize_diacritics_1.normalize(words[i][0])).toUpperCase();
                }
                result += (yield normalize_diacritics_1.normalize(words[length - 1])).toUpperCase();
                return result;
            }
        });
    }
    static getLoadedConnectionOptions() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const loadedConnectionOptions = yield Promise.resolve(typeorm_1.getConnectionOptions());
            return Object.assign(loadedConnectionOptions, {
                type: env_1.env.db.type,
                host: env_1.env.db.host,
                port: env_1.env.db.port,
                username: env_1.env.db.username,
                password: env_1.env.db.password,
                database: env_1.env.db.database,
                synchronize: env_1.env.db.synchronize,
                logging: env_1.env.db.logging,
                entities: env_1.env.app.dirs.entities,
                migrations: env_1.env.app.dirs.migrations,
            });
        });
    }
}
exports.Helper = Helper;
//# sourceMappingURL=Helper.js.map