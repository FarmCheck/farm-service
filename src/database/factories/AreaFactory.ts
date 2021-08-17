import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { Area } from '../../api/models';

define(Area, (faker: typeof Faker, settings: {
    locationID: string,
    employeeID: string,
    farmID: string,
    code: string,
    name: string,
}) => {
    const {locationID, employeeID, farmID, code, name} = settings;
    const area = new Area();

    area.id = uuid.v1();
    area.locationID = locationID;
    area.farmID = farmID;
    area.employeeID = employeeID;
    area.code = code;
    area.name = name;
    // 0: 'field area', 1: 'farming area', 2: 'production area', 3: 'field & product area', 4: 'field & production area', 5: 'others'
    area.type = faker.random.number(5);
    area.description = faker.lorem.sentence();
    area.address = faker.address.secondaryAddress();
    area.latitude = faker.address.latitude();
    area.longitude = faker.address.longitude();

    return area;
});
