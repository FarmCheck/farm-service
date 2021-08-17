import { Cron, CronController } from 'cron-decorators';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger } from '../../decorators/Logger';
import { LoggerInterface } from '../../lib/logger';
import { DiarySyncFailedRepository } from '../repositories/entities/DiarySyncFailedRepository';
import { TendermintService } from '../services';

@CronController('diaries')
export class DiaryCheckCronController {
    constructor(
        @OrmRepository()
        private readonly diarySyncFailedRepository: DiarySyncFailedRepository,
        private readonly tendermintService: TendermintService,
        @Logger(DiaryCheckCronController.name)
        private readonly logger: LoggerInterface
    ) {}

    /**
     * run every 5 minute
     */
    @Cron('echo-nodes', '*/5 * * * *')
    public echoNodes(): void {
        this.logger.info('start echo nodes');
        this.tendermintService
            .echo()
            .then(() => this.logger.info('node is fine'))
            .catch((error) => this.logger.warn('node is not fine', error));
    }

    /**
     * run every day at 23:00
     * timezone GMT+7 https://momentjs.com/timezone/docs/#/zone-object/offset/
     * TODO(optional): if it run very long and eat memory, move it to worker runner
     */
    @Cron('sync-push-failed', '0 23 */1 * *', { runOnInit: false, timeZone: 'Etc/GMT+7' })
    // @Cron('sync-push-failed', '* * * * *') // TEST
    public async syncPushFailedDiaries(): Promise<void> {
        this.logger.info('Start Re-push failed diaries');
        let skip = 0;
        while (true) {
            const failedDiaryList = await this.diarySyncFailedRepository.find({
                relations: ['diary'],
                take: 10,
                skip,
            });
            skip += 10;

            this.logger.info(`Re-push ${failedDiaryList.length} failed diaries`);
            if (failedDiaryList.length <= 0) {
                break;
            }

            const awaiter = failedDiaryList.map(async (failedDiary) => {
                try {
                    // TODO: handle user param
                    await this.tendermintService.push(failedDiary.diary, {} as any, failedDiary.action, true);
                    await this.diarySyncFailedRepository.softDelete(failedDiary.id);
                } catch (e) {
                    this.logger.warn(e.message, e);
                    await this.diarySyncFailedRepository.update(failedDiary.id, {
                        retriedTime: () => 'retried_time + 1',
                        lastError: e.message || e + '',
                    });
                }
            });

            await Promise.all(awaiter);
        }
    }
}
