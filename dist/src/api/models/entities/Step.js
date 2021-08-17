"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Step = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const type_graphql_dataloader_1 = require("type-graphql-dataloader");
const Process_1 = require("./Process");
const StepProperty_1 = require("./StepProperty");
const Diary_1 = require("./Diary");
let Step = class Step {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn('uuid'),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Step.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'process_id', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Step.prototype, "processID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Step.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'is_internal', default: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], Step.prototype, "isInternal", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Step.prototype, "description", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: 0, nullable: false }),
    type_graphql_1.Field(() => type_graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], Step.prototype, "order", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'diaries_total', default: 0 }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], Step.prototype, "diariesTotal", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => Process_1.Process, (process) => process.steps),
    typeorm_1.JoinColumn({ name: 'process_id' }),
    type_graphql_1.Field(() => Process_1.Process),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Process_1.Process)
], Step.prototype, "process", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => StepProperty_1.StepProperty, (stepProperty) => stepProperty.step),
    type_graphql_1.Field(() => [StepProperty_1.StepProperty]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Step.prototype, "stepProperties", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => Diary_1.Diary, (diary) => diary.step),
    type_graphql_1.Field(() => [Diary_1.Diary]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Step.prototype, "diaries", void 0);
Step = tslib_1.__decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Step);
exports.Step = Step;
//# sourceMappingURL=Step.js.map