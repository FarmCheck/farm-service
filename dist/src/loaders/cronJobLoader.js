"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronJobLoader = void 0;
const tslib_1 = require("tslib");
const cron_decorators_1 = require("cron-decorators");
const path = tslib_1.__importStar(require("path"));
const cronJobLoader = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    cron_decorators_1.registerController([
        path.resolve(__dirname, '../api/cronjobs/*.{ts,js}'),
    ]);
});
exports.cronJobLoader = cronJobLoader;
//# sourceMappingURL=cronJobLoader.js.map