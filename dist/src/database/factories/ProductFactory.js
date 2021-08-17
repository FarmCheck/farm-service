"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const uuid = tslib_1.__importStar(require("uuid"));
const models_1 = require("../../api/models");
typeorm_seeding_1.define(models_1.Product, (faker, settings) => {
    const { farmID, subCategoryID, locationID, code, name } = settings;
    const product = new models_1.Product();
    product.id = uuid.v1();
    product.farmID = farmID;
    product.subCategoryID = subCategoryID;
    product.locationID = locationID;
    product.code = code;
    product.barcode = (faker.random.number(8999999999999) + 1000000000000).toString();
    product.name = name;
    // 0: item, 1: kilogram, 2: others
    product.unit = faker.random.number(2);
    product.description = faker.lorem.sentence();
    product.duration = faker.random.number(50);
    // 0: day, 1: week, 2: month, 3: year
    product.durationType = faker.random.number(3);
    product.price = faker.random.number(2000000);
    product.isHaveBrand = faker.random.boolean();
    product.email = faker.internet.email();
    product.phoneNumber = faker.phone.phoneNumber();
    product.brandName = faker.company.companyName();
    product.brandDescription = faker.lorem.sentence();
    product.taxCode = ((faker.random.number(8999999999) + 1000000000) + '-' + (faker.random.number(899) + 100)).toString();
    product.website = 'https://farmhub.asia/';
    product.logo = 'https://i.imgur.com/fxslp2S.png';
    product.banner = 'https://i.imgur.com/4QN9okn.jpg';
    product.address = faker.address.streetAddress();
    product.latitude = faker.address.latitude();
    product.longitude = faker.address.longitude();
    return product;
});
//# sourceMappingURL=ProductFactory.js.map