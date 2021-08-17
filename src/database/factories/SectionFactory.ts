import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { Section } from '../../api/models';

define(Section, (faker: typeof Faker, settings: {
    productObjectID: string,
    processID: string,
    areaID: string,
    name: string,
    code: string,
}) => {

    const {productObjectID, processID, areaID, name, code} = settings;
    const section = new Section();

    section.id = uuid.v1();
    section.productObjectID = productObjectID;
    section.processID = processID;
    section.areaID = areaID;
    section.name = name;
    section.code = code;
    section.status = faker.random.number(1);
    section.type = faker.random.number(1);
    section.createdAt = faker.date.past().toISOString();

    return section;
});
