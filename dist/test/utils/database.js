"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDatabase = exports.migrateDatabase = exports.synchronizeDatabase = exports.createDatabaseConnection = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const env_1 = require("../../src/env");
const createDatabaseConnection = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    typeorm_1.useContainer(typedi_1.Container);
    const connection = yield typeorm_1.createConnection({
        type: env_1.env.db.type,
        database: env_1.env.db.database,
        logging: env_1.env.db.logging,
        entities: env_1.env.app.dirs.entities,
        migrations: env_1.env.app.dirs.migrations,
    });
    return connection;
});
exports.createDatabaseConnection = createDatabaseConnection;
const synchronizeDatabase = (connection) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield connection.dropDatabase();
    return connection.synchronize(true);
});
exports.synchronizeDatabase = synchronizeDatabase;
const migrateDatabase = (connection) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield connection.dropDatabase();
    return connection.runMigrations();
});
exports.migrateDatabase = migrateDatabase;
const closeDatabase = (connection) => {
    return connection.close();
};
exports.closeDatabase = closeDatabase;
//# sourceMappingURL=database.js.map