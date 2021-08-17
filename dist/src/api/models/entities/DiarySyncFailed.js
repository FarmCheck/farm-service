"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiarySyncFailed = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Diary_1 = require("./Diary");
let DiarySyncFailed = class DiarySyncFailed {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn({ type: 'uuid' }),
    tslib_1.__metadata("design:type", String)
], DiarySyncFailed.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'diary_id' }),
    tslib_1.__metadata("design:type", String)
], DiarySyncFailed.prototype, "diaryId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'varchar' }),
    tslib_1.__metadata("design:type", String)
], DiarySyncFailed.prototype, "action", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'last_error', type: 'text' }),
    tslib_1.__metadata("design:type", String)
], DiarySyncFailed.prototype, "lastError", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'retried_time', default: 0 }),
    tslib_1.__metadata("design:type", Number)
], DiarySyncFailed.prototype, "retriedTime", void 0);
tslib_1.__decorate([
    typeorm_1.CreateDateColumn({ name: 'created_at', default: 'now()' }),
    tslib_1.__metadata("design:type", String)
], DiarySyncFailed.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.UpdateDateColumn({ name: 'updated_at', default: 'now()' }),
    tslib_1.__metadata("design:type", String)
], DiarySyncFailed.prototype, "updateAt", void 0);
tslib_1.__decorate([
    typeorm_1.DeleteDateColumn({ name: 'deleted_at', nullable: true }),
    tslib_1.__metadata("design:type", String)
], DiarySyncFailed.prototype, "deletedAt", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(() => Diary_1.Diary),
    typeorm_1.JoinColumn({ name: 'diary_id' }),
    tslib_1.__metadata("design:type", Diary_1.Diary)
], DiarySyncFailed.prototype, "diary", void 0);
DiarySyncFailed = tslib_1.__decorate([
    typeorm_1.Entity('diary_sync_failed')
], DiarySyncFailed);
exports.DiarySyncFailed = DiarySyncFailed;
//# sourceMappingURL=DiarySyncFailed.js.map