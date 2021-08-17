"use strict";
// import {Service} from 'typedi';
// import {CronJob} from 'cron';
// import {OrmRepository} from 'typeorm-typedi-extensions';
// import {PostProductRepository} from '../../repositories';
// import {Logger, LoggerInterface} from '../../../decorators/Logger';
// import {LessThanOrEqual} from 'typeorm';
// import moment from 'moment';
// import _ from 'lodash';
// import {StatusPostProductEnum} from '../../models';
// import {CategoryService, PushLogService} from '../index';
// @Service()
// export class CronJobService {
//     constructor(
//         @OrmRepository() private postProductRepository: PostProductRepository,
//         @Logger(__filename) private log: LoggerInterface,
//         private categoryService: CategoryService,
//         private pushLogService: PushLogService
//     ) {
//     }
//     public updateStatusExpirePostProduct(): CronJob {
//         this.log.info('Update status expired post product cron job');
//         const job = new CronJob('* * * * *', async () => {
//         // const job = new CronJob('0 0-23 * * *', async () => {
//             const notifies = [];
//             const atTime = moment().format('YYYY-MM-DD hh:mm:ss a');
//             const postProducts = await this.postProductRepository.find({
//                 select: ['id', 'status', 'categorySub2ID', 'userID'],
//                 where: [
//                     {
//                         status: 'ACTIVATE',
//                         stoppedAt: LessThanOrEqual(atTime),
//                     },
//                 ],
//             });
//             if (postProducts.length === 0) {
//                 return;
//             }
//             _.forEach(postProducts, item => {
//                 item.status = StatusPostProductEnum['2'];
//             });
//             await this.postProductRepository.save(postProducts);
//             _.forEach(postProducts, item => {
//                 this.categoryService.updateTotalFollowCategorySub2ID({categorySub2ID: item.categorySub2ID, updateTotalType: 'SUB'});
//                 const notify = {
//                     userID: item.userID,
//                     srcID: '',
//                     activityType: 8,
//                     dstID: item.id,
//                     dstType: 0,
//                 };
//                 notifies.push(notify);
//             });
//             this.pushLogService.sendNotifyMultiNotifies(notifies);
//         });
//         return job;
//     }
// }
//# sourceMappingURL=CronJobService.js.map