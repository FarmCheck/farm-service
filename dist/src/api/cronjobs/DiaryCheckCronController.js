"use strict";
var DiaryCheckCronController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryCheckCronController = void 0;
const tslib_1 = require("tslib");
const cron_decorators_1 = require("cron-decorators");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../decorators/Logger");
const DiarySyncFailedRepository_1 = require("../repositories/entities/DiarySyncFailedRepository");
const services_1 = require("../services");
let DiaryCheckCronController = DiaryCheckCronController_1 = class DiaryCheckCronController {
    constructor(diarySyncFailedRepository, tendermintService, logger) {
        this.diarySyncFailedRepository = diarySyncFailedRepository;
        this.tendermintService = tendermintService;
        this.logger = logger;
    }
    /**
     * run every 5 minute
     */
    echoNodes() {
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
    syncPushFailedDiaries() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.logger.info('Start Re-push failed diaries');
            let skip = 0;
            while (true) {
                const failedDiaryList = yield this.diarySyncFailedRepository.find({
                    relations: ['diary'],
                    take: 10,
                    skip,
                });
                skip += 10;
                this.logger.info(`Re-push ${failedDiaryList.length} failed diaries`);
                if (failedDiaryList.length <= 0) {
                    break;
                }
                const awaiter = failedDiaryList.map((failedDiary) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    try {
                        // TODO: handle user param
                        yield this.tendermintService.push(failedDiary.diary, {}, failedDiary.action, true);
                        yield this.diarySyncFailedRepository.softDelete(failedDiary.id);
                    }
                    catch (e) {
                        this.logger.warn(e.message, e);
                        yield this.diarySyncFailedRepository.update(failedDiary.id, {
                            retriedTime: () => 'retried_time + 1',
                            lastError: e.message || e + '',
                        });
                    }
                }));
                yield Promise.all(awaiter);
            }
        });
    }
};
tslib_1.__decorate([
    cron_decorators_1.Cron('echo-nodes', '*/5 * * * *'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DiaryCheckCronController.prototype, "echoNodes", null);
tslib_1.__decorate([
    cron_decorators_1.Cron('sync-push-failed', '0 23 */1 * *', { runOnInit: false, timeZone: 'Etc/GMT+7' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], DiaryCheckCronController.prototype, "syncPushFailedDiaries", null);
DiaryCheckCronController = DiaryCheckCronController_1 = tslib_1.__decorate([
    cron_decorators_1.CronController('diaries'),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(2, Logger_1.Logger(DiaryCheckCronController_1.name)),
    tslib_1.__metadata("design:paramtypes", [DiarySyncFailedRepository_1.DiarySyncFailedRepository,
        services_1.TendermintService, Object])
], DiaryCheckCronController);
exports.DiaryCheckCronController = DiaryCheckCronController;
//# sourceMappingURL=DiaryCheckCronController.js.map