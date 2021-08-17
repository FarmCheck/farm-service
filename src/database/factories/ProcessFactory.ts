import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { Process } from '../../api/models';

define(Process, (faker: typeof Faker, settings: {
    farmID: string,
    code: string,
    name: string,
}) => {
    const {farmID, code, name} = settings;
    const process = new Process();

    process.id = uuid.v1();
    process.farmID = farmID;
    process.code = code;
    process.name = name;

    return process;
});
