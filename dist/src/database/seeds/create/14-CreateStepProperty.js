"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStepProperty = void 0;
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const models_1 = require("../../../api/models");
class CreateStepProperty {
    seed(factory, connection) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const steps = yield connection.manager.find(models_1.Step);
            const stepProperties = [];
            yield typeorm_seeding_1.times(steps.length, (i) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                stepProperties.push(yield factory(models_1.StepProperty)({ stepID: steps[i].id }).make());
            }));
            yield connection.manager.save(stepProperties, {
                chunk: 100,
            });
        });
    }
}
exports.CreateStepProperty = CreateStepProperty;
//# sourceMappingURL=14-CreateStepProperty.js.map