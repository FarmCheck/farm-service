"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStep = void 0;
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const faker = tslib_1.__importStar(require("faker"));
const models_1 = require("../../../api/models");
class CreateStep {
    seed(factory, connection) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            //
            // The current typeorm-seeding used has bug which is about seeding simple-array
            // This bug was resolved in version 1.0.0
            //
            const processes = yield connection.manager.find(models_1.Process);
            const steps = [];
            yield typeorm_seeding_1.times(processes.length, (i) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const quantity = faker.random.number(5) + 5;
                yield typeorm_seeding_1.times(quantity, (order) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const step = yield factory(models_1.Step)({
                        order,
                        processID: processes[i].id,
                    }).make();
                    steps.push(step);
                }));
                processes[i].isHaveStep = true;
                processes[i].quantity = quantity;
            }));
            yield connection.transaction((manager) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                yield manager.save(steps, {
                    chunk: 100,
                });
                yield manager.save(processes, {
                    chunk: 100,
                });
            }));
        });
    }
}
exports.CreateStep = CreateStep;
//# sourceMappingURL=13-CreateStep.js.map