import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { Step } from '../../api/models';

define(Step, (faker: typeof Faker, settings: {
    processID: string,
    order: number,
}) => {
    const { processID, order } = settings;
    const step = new Step();

    step.id = uuid.v1();
    step.processID = processID;
    step.name = faker.commerce.productName();
    step.isInternal = faker.random.boolean();
    step.description = faker.lorem.sentence();
    step.order = order;

    return step;
});
