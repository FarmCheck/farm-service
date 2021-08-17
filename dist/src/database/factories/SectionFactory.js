"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const uuid = tslib_1.__importStar(require("uuid"));
const models_1 = require("../../api/models");
typeorm_seeding_1.define(models_1.Section, (faker, settings) => {
    const { productObjectID, processID, areaID, name, code } = settings;
    const section = new models_1.Section();
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
//# sourceMappingURL=SectionFactory.js.map