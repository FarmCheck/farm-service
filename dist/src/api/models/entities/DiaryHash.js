"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryHash = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Diary_1 = require("./Diary");
const type_graphql_1 = require("type-graphql");
const type_graphql_dataloader_1 = require("type-graphql-dataloader");
let DiaryHash = class DiaryHash {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn({ type: 'uuid', name: 'diary_id' }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], DiaryHash.prototype, "diaryId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'varchar', unique: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], DiaryHash.prototype, "hash", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], DiaryHash.prototype, "height", void 0);
tslib_1.__decorate([
    typeorm_1.OneToOne(() => Diary_1.Diary, diary => diary.hash),
    typeorm_1.JoinColumn({ name: 'diary_id' }),
    type_graphql_1.Field(() => Diary_1.Diary),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Diary_1.Diary)
], DiaryHash.prototype, "diary", void 0);
DiaryHash = tslib_1.__decorate([
    typeorm_1.Entity({ name: 'diary_hash' }),
    type_graphql_1.ObjectType(),
    tslib_1.__metadata("design:paramtypes", [Object])
], DiaryHash);
exports.DiaryHash = DiaryHash;
//# sourceMappingURL=DiaryHash.js.map