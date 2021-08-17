"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepProperty = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Step_1 = require("./Step");
const type_graphql_1 = require("type-graphql");
let StepProperty = class StepProperty {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn('uuid'),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], StepProperty.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'step_id', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], StepProperty.prototype, "stepID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], StepProperty.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'is_required', default: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], StepProperty.prototype, "isRequired", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: 0 }),
    type_graphql_1.Field({ description: '0: text, 1: number, 2: link' }),
    tslib_1.__metadata("design:type", Number)
], StepProperty.prototype, "type", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], StepProperty.prototype, "value", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => Step_1.Step, (step) => step.stepProperties),
    typeorm_1.JoinColumn({ name: 'step_id' }),
    tslib_1.__metadata("design:type", Step_1.Step)
], StepProperty.prototype, "step", void 0);
StepProperty = tslib_1.__decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], StepProperty);
exports.StepProperty = StepProperty;
//# sourceMappingURL=StepProperty.js.map