"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonLoader = void 0;
const tslib_1 = require("tslib");
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = tslib_1.__importDefault(require("winston-daily-rotate-file"));
const env_1 = require("../env");
let transport = undefined;
switch (env_1.env.log.logDriver.toLowerCase()) {
    case 'console':
        transport = new winston_1.transports.Console({
            level: env_1.env.log.level,
            handleExceptions: true,
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
        });
        break;
    case 'file':
        if (!env_1.env.log.logDir) {
            throw new Error('Log dir must be specified');
        }
        transport = new winston_daily_rotate_file_1.default({
            filename: 'service-%DATE%.log',
            datePattern: 'DD-MM-YYYY',
            dirname: env_1.env.log.logDir,
            maxSize: env_1.env.log.logMaxSize,
            level: env_1.env.log.level,
            format: winston_1.format.combine(winston_1.format.simple()),
        });
        break;
    default:
        transport = undefined;
}
if (!transport) {
    throw new Error('Log driver is invalid');
}
const winstonLoader = (settings) => {
    winston_1.configure({
        transports: [
            transport,
        ],
    });
};
exports.winstonLoader = winstonLoader;
//# sourceMappingURL=winstonLoader.js.map