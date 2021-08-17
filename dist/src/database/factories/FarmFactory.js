"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const uuid = tslib_1.__importStar(require("uuid"));
const models_1 = require("../../api/models");
typeorm_seeding_1.define(models_1.Farm, (faker, settings) => {
    const { locationID, userID, code, name } = settings;
    const farm = new models_1.Farm();
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
//# sourceMappingURL=FarmFactory.js.map