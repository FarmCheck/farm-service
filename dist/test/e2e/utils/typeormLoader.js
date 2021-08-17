"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeormLoader = void 0;
const tslib_1 = require("tslib");
const database_1 = require("../../utils/database");
const typeormLoader = (settings) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const connection = yield database_1.createDatabaseConnection();
    if (settings) {
        settings.setData('connection', connection);
        settings.onShutdown(() => connection.close());
    }
});
exports.typeormLoader = typeormLoader;
//# sourceMappingURL=typeormLoader.js.map