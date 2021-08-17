"use strict";
// import {Service} from 'typedi';
// import {OrmRepository} from 'typeorm-typedi-extensions';
// import {PostProductRepository, ProcessRepository} from '../../repositories';
// import {Logger, LoggerInterface} from '../../../decorators/Logger';
// import {IDstNotify, INotify, ISrcNotify} from '../base';
// import * as request from 'request-promise';
// import {env} from '../../../env';
// import moment from 'moment';
// import _ from 'lodash';
// /*
// - activity_type=0: Da xem san pham
// - activity_type=1: Vua thich san pham
// - activity_type=2: Da mua san pham
// - activity_type=3: Tao thanh cong tin dang
// - activity_type=4: Tao thanh cong quy trinh
// - activity_type=5: Duyet thanh cong tin dang
// - activity_type=6: Duyet that bai tin dang
// - activity_type=7: Vua dang tin
// - activity_type=8: Go tin dang het han
// - activity_type=9: Go tin dang het hang
// ...
// - activity_type=10: Vua theo doi ban
// - activity_type=11: Vua binh luan ve san pham ban
// - activity_type=12: Tao thanh cong don hang
// */
// /*
// - dst_type=0: post product
// - dst_type=1: process
// - dst_type=2: user
// - dst_type=3: order
// */
// @Service()
// export class PushLogService {
//     constructor(
//         @OrmRepository() private postProductRepository: PostProductRepository,
//         @OrmRepository() private processRepository: ProcessRepository,
//         @Logger(__filename) private log: LoggerInterface
//     ) {
//     }
//     public async sendNotify(body: any): Promise<object | undefined> {
//         this.log.info('Send notify to push log service');
//         const {
//             userID,
//             srcID,
//             activityType,
//             dstID,
//             dstType,
//         } = body;
//         const src = await this.getSrcInfo(activityType, srcID);
//         const dst = await this.getDstInfo(dstType, dstID);
//         const notifies = [];
//         const notify: INotify = {
//             user_id: userID,
//             src,
//             activity_type: activityType,
//             dst,
//             dst_type: dstType,
//             at_time: moment().format(),
//         };
//         notifies.push(notify);
//         const res = await request.post(
//             {url: `${env.lotusfarm.pushLogService}notis`, json: {notis: notifies}}
//         );
//         console.log({notify, res});
//         return res;
//     }
//     public async sendNotifyMultiUser(body: any): Promise<object | undefined> {
//         this.log.info('Send multi users to push log service');
//         const {
//             userIDs,
//             srcID,
//             activityType,
//             dstID,
//             dstType,
//         } = body;
//         const src = await this.getSrcInfo(activityType, srcID);
//         const dst = await this.getDstInfo(dstType, dstID);
//         const notify: INotify = {
//             user_ids: userIDs,
//             src,
//             activity_type: activityType,
//             dst,
//             dst_type: dstType,
//             at_time: moment().format(),
//         };
//         const res = await request.post(
//             {url: `${env.lotusfarm.pushLogService}broadcast-noti`, json: notify}
//         );
//         console.log({notify, res});
//         return res;
//     }
//     public async sendNotifyMultiNotifies(body: any): Promise<object | undefined> {
//         this.log.info('Send multi notifies to push log service');
//         const notifies = [];
//         for (const item of body) {
//             const {
//                 userID,
//                 srcID,
//                 activityType,
//                 dstID,
//                 dstType,
//             } = item;
//             const src = await this.getSrcInfo(activityType, srcID);
//             const dst = await this.getDstInfo(dstType, dstID);
//             const notify: INotify = {
//                 user_id: userID,
//                 src,
//                 activity_type: activityType,
//                 dst,
//                 dst_type: dstType,
//                 at_time: moment().format(),
//             };
//             notifies.push(notify);
//         }
//         const res = await request.post(
//             {url: `${env.lotusfarm.pushLogService}notis`, json: {notis: notifies}}
//         );
//         console.log({notifies, res});
//         return res;
//     }
//     private async getSrcInfo(activityType: number, srcID: string): Promise<ISrcNotify | undefined> {
//         switch (activityType) {
//             case 0:
//             case 1:
//             case 2:
//             case 3:
//             case 4:
//             case 7:
//                 let user = (await request.get(
//                     {url: `${env.lotusfarm.userService}users/another-service/base-info/${srcID}/notify`}
//                 ));
//                 user = JSON.parse(user).data;
//                 return {id: user.id, name: user.familyName + ' ' + user.givenName, avatar: user.picture};
//             case 5:
//             case 6:
//                 return {id: '', name: 'admin', avatar: 'https://i.imgur.com/BgheuMO.png'};
//             case 8:
//             case 9:
//                 return {id: '', name: 'He thong', avatar: 'https://i.imgur.com/BgheuMO.png'};
//             default:
//                 return undefined;
//         }
//     }
//     private async getDstInfo(dstType: number, dstID: string): Promise<IDstNotify | undefined> {
//         switch (dstType) {
//             case 0:
//                 const postProduct = await this.postProductRepository.findOne({select: ['id', 'name'], where: [{id: dstID}]});
//                 return {id: postProduct.id, name: postProduct.name};
//             case 1:
//                 const process = await this.processRepository.findOne({select: ['id', 'name'], where: [{id: dstID}]});
//                 return {id: process.id, name: process.name};
//             default:
//                 return undefined;
//         }
//     }
// }
//# sourceMappingURL=PushLogService.js.map