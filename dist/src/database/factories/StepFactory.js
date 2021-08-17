"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const uuid = tslib_1.__importStar(require("uuid"));
const models_1 = require("../../api/models");
typeorm_seeding_1.define(models_1.Step, (faker, settings) => {
    const { processID, order } = settings;
    const step = new models_1.Step();
    step.id = uuid.v1();
    step.processID = processID;
    step.name = faker.commerce.productName();
    step.isInternal = faker.random.boolean();
    step.description = faker.lorem.sentence();
    step.order = order;
    return step;
});
//# sourceMappingURL=StepFactory.js.map