"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const tslib_1 = require("tslib");
const path = tslib_1.__importStar(require("path"));
const winston = tslib_1.__importStar(require("winston"));
/**
 * core.Log
 * ------------------------------------------------
 *
 * This is the main Logger Object. You can create a scope logger
 * or directly use the static log methods.
 *
 * By Default it uses the debug-adapter, but you are able to change
 * this in the start up process in the core/index.ts file.
 */
class Logger {
    constructor(scope) {
        this.scope = Logger.parsePathToScope((scope) ? scope : Logger.DEFAULT_SCOPE);
    }
    static parsePathToScope(filepath) {
        if (filepath.indexOf(path.sep) >= 0) {
            filepath = filepath.replace(process.cwd(), '');
            filepath = filepath.replace(`${path.sep}src${path.sep}`, '');
            filepath = filepath.replace(`${path.sep}dist${path.sep}`, '');
            filepath = filepath.replace('.ts', '');
            filepath = filepath.replace('.js', '');
            filepath = filepath.replace(path.sep, ':');
        }
        return filepath;
    }
    debug(message, ...args) {
        this.log('debug', message, args);
    }
    info(message, ...args) {
        this.log('info', message, args);
    }
    warn(message, ...args) {
        this.log('warn', message, args);
    }
    error(message, ...args) {
        this.log('error', message, args);
    }
    log(level, message, args, line = new Error()) {
        if (winston) {
            winston[level](`${this.formatDateTime()}${this.formatScope()} ${message}`, args);
        }
    }
    formatDateTime() {
        const current = new Date();
        const dateTimeFormat = Intl.DateTimeFormat('en', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
        return `[${dateTimeFormat.format(current)}]`;
    }
    formatScope() {
        return `[${this.scope}]`;
    }
}
exports.Logger = Logger;
Logger.DEFAULT_SCOPE = 'app';
//# sourceMappingURL=Logger.js.map