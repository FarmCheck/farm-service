"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureLogger = void 0;
const winston_1 = require("winston");
const configureLogger = () => {
    winston_1.configure({
        transports: [
            new winston_1.transports.Console({
                level: 'none',
                handleExceptions: false,
            }),
        ],
    });
};
exports.configureLogger = configureLogger;
//# sourceMappingURL=logger.js.map