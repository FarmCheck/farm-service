"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryHashPushError = void 0;
class DiaryHashPushError extends Error {
    constructor(log = 'unknown') {
        super('Cannot push to tendermint: ' + log);
    }
}
exports.DiaryHashPushError = DiaryHashPushError;
//# sourceMappingURL=DiaryHashPushError.js.map