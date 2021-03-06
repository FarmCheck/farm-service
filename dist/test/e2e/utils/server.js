"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareServer = void 0;
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const database_1 = require("../../utils/database");
const bootstrap_1 = require("./bootstrap");
const prepareServer = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const settings = yield bootstrap_1.bootstrapApp();
    if (options && options.migrate) {
        yield database_1.migrateDatabase(settings.connection);
    }
    typeorm_seeding_1.setConnection(settings.connection);
    return settings;
});
exports.prepareServer = prepareServer;
//# sourceMappingURL=server.js.map