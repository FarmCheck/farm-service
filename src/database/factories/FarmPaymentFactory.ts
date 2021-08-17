import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { FarmPayment } from '../../api/models';

define(FarmPayment, (faker: typeof Faker, settings: {
    farmID: string,
}) => {
    const {farmID} = settings;
    const farmPayment = new FarmPayment();

    farmPayment.id = uuid.v1();
    farmPayment.farmID = farmID;
    farmPayment.type = faker.random.number(3);
    farmPayment.provider = faker.finance.accountName();
    farmPayment.accountNo = faker.finance.account();
    farmPayment.expiredAt = faker.date.future().toISOString();

    return farmPayment;
});
