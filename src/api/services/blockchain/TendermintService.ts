import { Service } from 'typedi';
import Axios, { AxiosInstance } from 'axios';
import { env } from '../../../env';
import { Diary, DiaryHash, DiarySyncFailed } from '../../models';
import { User } from '../../types/User';
import { Buffer } from 'buffer';
import { DiaryHashPushError } from '../../errors/Diary/DiaryHashPushError';
import { DiaryHashRepository } from '../../repositories';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { getOsEnvOptional } from '../../../lib/env';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { URLSearchParams } from 'url';
import { getRepository } from 'typeorm';
import { v1 as uuidV1 } from 'uuid';

export interface TendermintRpcResponse<T extends any = any> {
    jsonrpc: string;
    id: -1 | string;
    result: T;
}

export interface TxSearchResult {
    txs: {
        hash: string;
        /** number string */
        height: string;
        index: number;
        tx_result: {
            code: 0 | 1 | 2;
            /** base64 */
            data: string;
            log: string;
        };
        /** base64 */
        tx: string;
    }[];
    total_count: number;
}

@Service()
export class TendermintService {
    private static decodeBase64<O>(base64data: string, outClass: ClassConstructor<O>): O {
        const json = Buffer.from(base64data, 'base64').toString('utf-8');
        const data = JSON.parse(json);
        return plainToClass(outClass, data.data);
    }

    private static getRandomUri(): string {
        const uris = env.blockchain.uris;
        const length = uris.length;
        const index = Math.trunc(Math.random() * length);
        return uris[index];
    }

    private axios: AxiosInstance;

    constructor(
        @OrmRepository()
        private repository: DiaryHashRepository,
        @Logger(__filename)
        private readonly logger: LoggerInterface
    ) {
        this.axios = Axios.create();
    }

    /**
     * Update the diary to tendermint nodes
     * If success, create diary hash
     * If failed, print fail exception and then update diary status
     */
    public async push(diary: Diary, author: User, action: 'CREATE' | 'UPDATE', throwError: boolean = false): Promise<Diary> {
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
            const {data: txResult} = await this.retryPromise(
                this.axios.post<TendermintRpcResponse>(TendermintService.getRandomUri(), {
                    jsonrpc: '2.0',
                    id: `${getOsEnvOptional('HOST') || 'local'}`,
                    method: 'broadcast_tx_commit',
                    params: {
                        tx: Buffer.from(txString, 'utf8').toString('base64'),
                    },
                }),
                env.blockchain.uris.length
            );

            const {
                result: {
                    check_tx: {
                        code: checkCode = 1,
                        log: checkLog = 'check error',
                    } = {},
                    deliver_tx: {
                        code: deliverCode = 1,
                        log: deliverLog = 'deliver error',
                    } = {},
                    hash = '',
                    height = '',
                } = {},
            } = txResult;

            if (checkCode > 0 || deliverCode > 0) {
                throw new DiaryHashPushError(checkCode > 0 ? checkLog : deliverLog);
            }

            const hashDiaryRecord = new DiaryHash({
                diaryId: diary.id,
                hash,
                height: +height,
            });

            diary.hash = await this.repository.save(hashDiaryRecord);
            return diary;
        } catch (e) {
            if (throwError) {
                throw e;
            }
            this.logger.error(e);
            this.saveFailedCheckDiary(diary, action, e); // run async without await to skip error
            return diary;
        }
    }

    public async queryDiary([field, value]: [string, string], ...otherFieldValues: [string, string][]): Promise<Diary[]> {
        const params = new URLSearchParams();
        params.append('query', `"diary.${field}='${value}'"`);
        /**
         * build query like /tx_search?query=...&query=...&query=....
         */
        otherFieldValues.forEach((fv) => {
            params.append('query', `"diary.${fv[0]}='${fv[1]}'"`);
        });
        const {data} = await this.axios
            .get<TendermintRpcResponse<TxSearchResult>>(TendermintService.getRandomUri() + '/tx_search', {
                params,
            });

        const {
            result: {
                txs,
                total_count,
            },
        } = data;

        if (total_count === 0) {
            return [];
        }
        return txs.map(txData => {
            const diary = TendermintService.decodeBase64(
                txData.tx,
                Diary
            );
            diary.hash = new DiaryHash({
                hash: txData.hash,
                height: +txData.height,
            });
            return diary;
        });
    }

    public async echo(): Promise<any> {
        return this.axios.get(TendermintService.getRandomUri() + `/health`);
    }

    private async retryPromise<T = any>(promise: Promise<T>, times: number = 0, lastError?: Error)
        : Promise<T> {
        if (times < 0) {
            throw lastError;
        }
        try {
            return await promise;
        } catch (e) {
            return await this.retryPromise(promise, times - 1, e);
        }
    }

    private async saveFailedCheckDiary(diary: Diary, action: 'CREATE' | 'UPDATE', error: Error): Promise<void> {
        const repo = getRepository(DiarySyncFailed);
        const entity = repo.create({
            id: uuidV1(),
            diaryId: diary.id,
            action,
            lastError: error.message,
        });
        await repo.insert(entity);
    }
}
