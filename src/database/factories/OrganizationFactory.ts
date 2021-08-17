import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { Organization } from '../../api/models';

define(Organization, (faker: typeof Faker, settings: {
    name: string,
    type: number
}) => {
    const organization = new Organization();

    organization.id = uuid.v1();
    organization.logo = 'https://i.imgur.com/fxslp2S.png';
    organization.name = faker.company.companyName();
    organization.description = faker.lorem.sentence();

    return organization;
});
