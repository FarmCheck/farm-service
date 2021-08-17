export class DiaryHashPushError extends Error {
    constructor(log: string = 'unknown') {
        super('Cannot push to tendermint: ' + log);
    }
}
