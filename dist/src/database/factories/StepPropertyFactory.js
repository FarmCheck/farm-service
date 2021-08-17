"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const uuid = tslib_1.__importStar(require("uuid"));
const models_1 = require("../../api/models");
typeorm_seeding_1.define(models_1.StepProperty, (faker, settings) => {
    const { stepID } = settings;
    const stepProperty = new models_1.StepProperty();
    stepProperty.id = uuid.v1();
    stepProperty.stepID = stepID;
    stepProperty.name = faker.commerce.productMaterial();
    stepProperty.isRequired = faker.random.boolean();
    stepProperty.type = faker.random.number(2);
    stepProperty.value = faker.random.word();
    return stepProperty;
});
//# sourceMappingURL=StepPropertyFactory.js.map