"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Diary = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const type_graphql_1 = require("type-graphql");
const type_graphql_dataloader_1 = require("type-graphql-dataloader");
const Step_1 = require("./Step");
const Section_1 = require("./Section");
const DiaryHash_1 = require("./DiaryHash");
let Diary = class Diary {
    get isVerified() {
        return !!this.hash;
    }
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn('uuid'),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Diary.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'step_id', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Diary.prototype, "stepID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'section_id', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Diary.prototype, "sectionID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Diary.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Diary.prototype, "description", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'text', array: true, default: [] }),
    type_graphql_1.Field(() => [String]),
    tslib_1.__metadata("design:type", Array)
], Diary.prototype, "urls", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'created_at', default: 'now()' }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Diary.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => Step_1.Step, (step) => step.diaries),
    typeorm_1.JoinColumn({ name: 'step_id' }),
    type_graphql_1.Field(() => Step_1.Step),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Step_1.Step)
], Diary.prototype, "step", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => Section_1.Section, (section) => section.diaries),
    typeorm_1.JoinColumn({ name: 'section_id' }),
    type_graphql_1.Field(() => Section_1.Section),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Section_1.Section)
], Diary.prototype, "section", void 0);
tslib_1.__decorate([
    typeorm_1.OneToOne(() => DiaryHash_1.DiaryHash, diaryHash => diaryHash.diary, { eager: true }),
    type_graphql_1.Field(() => DiaryHash_1.DiaryHash, { nullable: true }),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", DiaryHash_1.DiaryHash)
], Diary.prototype, "hash", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => Boolean),
    type_graphql_1.Field({ description: 'must query with "hash" relation' }),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [])
], Diary.prototype, "isVerified", null);
Diary = tslib_1.__decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Diary);
exports.Diary = Diary;
//# sourceMappingURL=Diary.js.map