"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const uuid = tslib_1.__importStar(require("uuid"));
const models_1 = require("../../api/models");
typeorm_seeding_1.define(models_1.Organization, (faker, settings) => {
    const organization = new models_1.Organization();
    organization.id = uuid.v1();
    organization.logo = 'https://i.imgur.com/fxslp2S.png';
    organization.name = faker.company.companyName();
    organization.description = faker.lorem.sentence();
    return organization;
});
//# sourceMappingURL=OrganizationFactory.js.map