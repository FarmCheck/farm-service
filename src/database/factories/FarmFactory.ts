import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { Farm } from '../../api/models';

define(Farm, (faker: typeof Faker, settings: {
    locationID: string,
    userID: string,
    code: string,
    name: string,
}) => {
    const {locationID, userID, code, name} = settings;
    const farm = new Farm();

    farm.id = uuid.v1();
    farm.locationID = locationID;
    farm.userID = userID;
    farm.code = code;
    farm.name = name;
    farm.description = faker.lorem.sentence();
    farm.isVerifiedPhoneNumber = faker.random.boolean();
    farm.isVerifiedEmail = faker.random.boolean();
    farm.email = faker.internet.email();
    farm.logo = 'https://i.imgur.com/fxslp2S.png';
    farm.banner = 'https://i.imgur.com/4QN9okn.jpg';
    farm.phoneNumber = faker.phone.phoneNumber();
    farm.website = 'https://farmhub.asia/';
    farm.address = faker.address.streetAddress();
    farm.latitude = faker.address.latitude();
    farm.longitude = faker.address.longitude();

    return farm;
});
