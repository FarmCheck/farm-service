"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const uuid = tslib_1.__importStar(require("uuid"));
const models_1 = require("../../api/models");
typeorm_seeding_1.define(models_1.FarmPayment, (faker, settings) => {
    const { farmID } = settings;
    const farmPayment = new models_1.FarmPayment();
    farmPayment.id = uuid.v1();
    farmPayment.farmID = farmID;
    farmPayment.type = faker.random.number(3);
    farmPayment.provider = faker.finance.accountName();
    farmPayment.accountNo = faker.finance.account();
    farmPayment.expiredAt = faker.date.future().toISOString();
    return farmPayment;
});
//# sourceMappingURL=FarmPaymentFactory.js.map