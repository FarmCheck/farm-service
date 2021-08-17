"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const uuid = tslib_1.__importStar(require("uuid"));
const models_1 = require("../../api/models");
typeorm_seeding_1.define(models_1.Area, (faker, settings) => {
    const { locationID, employeeID, farmID, code, name } = settings;
    const area = new models_1.Area();
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
//# sourceMappingURL=AreaFactory.js.map