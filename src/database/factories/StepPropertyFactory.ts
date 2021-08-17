import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { StepProperty } from '../../api/models';

define(StepProperty, (faker: typeof Faker, settings: {
    stepID: string
}) => {
    const {stepID} = settings;
    const stepProperty = new StepProperty();

    stepProperty.id = uuid.v1();
    stepProperty.stepID = stepID;
    stepProperty.name = faker.commerce.productMaterial();
    stepProperty.isRequired = faker.random.boolean();
    stepProperty.type = faker.random.number(2);
    stepProperty.value = faker.random.word();

    return stepProperty;
});
