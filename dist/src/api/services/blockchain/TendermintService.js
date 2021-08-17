"use strict";
var TendermintService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TendermintService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const axios_1 = tslib_1.__importDefault(require("axios"));
const env_1 = require("../../../env");
const models_1 = require("../../models");
const buffer_1 = require("buffer");
const DiaryHashPushError_1 = require("../../errors/Diary/DiaryHashPushError");
const repositories_1 = require("../../repositories");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const env_2 = require("../../../lib/env");
const class_transformer_1 = require("class-transformer");
const Logger_1 = require("../../../decorators/Logger");
const url_1 = require("url");
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
let TendermintService = TendermintService_1 = class TendermintService {
    constructor(repository, logger) {
        this.repository = repository;
        this.logger = logger;
        this.axios = axios_1.default.create();
    }
    static decodeBase64(base64data, outClass) {
        const json = buffer_1.Buffer.from(base64data, 'base64').toString('utf-8');
        const data = JSON.parse(json);
        return class_transformer_1.plainToClass(outClass, data.data);
    }
    static getRandomUri() {
        const uris = env_1.env.blockchain.uris;
        const length = uris.length;
        const index = Math.trunc(Math.random() * length);
        return uris[index];
    }
    /**
     * Update the diary to tendermint nodes
     * If success, create diary hash
     * If failed, print fail exception and then update diary status
     */
    push(diary, author, action, throwError = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.logger.debug('Push diary ' + diary.id + ' to tendermint', diary);
            try {
                // TODO: [Beo] using class here
                const tx = {
                    type: 'DIARY',
                    action,
                    data: diary,
                    author: {
                        id: author.id,
                        name: author.firstName + ' ' + author.lastName,
                    },
                };
                const txString = JSON.stringify(tx);
                const { data: txResult } = yield this.retryPromise(this.axios.post(TendermintService_1.getRandomUri(), {
                    jsonrpc: '2.0',
                    id: `${env_2.getOsEnvOptional('HOST') || 'local'}`,
                    method: 'broadcast_tx_commit',
                    params: {
                        tx: buffer_1.Buffer.from(txString, 'utf8').toString('base64'),
                    },
                }), env_1.env.blockchain.uris.length);
                const { result: { check_tx: { code: checkCode = 1, log: checkLog = 'check error', } = {}, deliver_tx: { code: deliverCode = 1, log: deliverLog = 'deliver error', } = {}, hash = '', height = '', } = {}, } = txResult;
                if (checkCode > 0 || deliverCode > 0) {
                    throw new DiaryHashPushError_1.DiaryHashPushError(checkCode > 0 ? checkLog : deliverLog);
                }
                const hashDiaryRecord = new models_1.DiaryHash({
                    diaryId: diary.id,
                    hash,
                    height: +height,
                });
                diary.hash = yield this.repository.save(hashDiaryRecord);
                return diary;
            }
            catch (e) {
                if (throwError) {
                    throw e;
                }
                this.logger.error(e);
                this.saveFailedCheckDiary(diary, action, e); // run async without await to skip error
                return diary;
            }
        });
    }
    queryDiary([field, value], ...otherFieldValues) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const params = new url_1.URLSearchParams();
            params.append('query', `"diary.${field}='${value}'"`);
            /**
             * build query like /tx_search?query=...&query=...&query=....
             */
            otherFieldValues.forEach((fv) => {
                params.append('query', `"diary.${fv[0]}='${fv[1]}'"`);
            });
            const { data } = yield this.axios
                .get(TendermintService_1.getRandomUri() + '/tx_search', {
                params,
            });
            const { result: { txs, total_count, }, } = data;
            if (total_count === 0) {
                return [];
            }
            return txs.map(txData => {
                const diary = TendermintService_1.decodeBase64(txData.tx, models_1.Diary);
                diary.hash = new models_1.DiaryHash({
                    hash: txData.hash,
                    height: +txData.height,
                });
                return diary;
            });
        });
    }
    echo() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.axios.get(TendermintService_1.getRandomUri() + `/health`);
        });
    }
    retryPromise(promise, times = 0, lastError) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (times < 0) {
                throw lastError;
            }
            try {
                return yield promise;
            }
            catch (e) {
                return yield this.retryPromise(promise, times - 1, e);
            }
        });
    }
    saveFailedCheckDiary(diary, action, error) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = typeorm_1.getRepository(models_1.DiarySyncFailed);
            const entity = repo.create({
                id: uuid_1.v1(),
                diaryId: diary.id,
                action,
                lastError: error.message,
            });
            yield repo.insert(entity);
        });
    }
};
TendermintService = TendermintService_1 = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DiaryHashRepository, Object])
], TendermintService);
exports.TendermintService = TendermintService;
//# sourceMappingURL=TendermintService.js.map