"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const uuid = tslib_1.__importStar(require("uuid"));
const models_1 = require("../../api/models");
typeorm_seeding_1.define(models_1.Employee, (faker, settings) => {
    const { farmID, code, name } = settings;
    const employee = new models_1.Employee();
    employee.id = uuid.v1();
    employee.farmID = farmID;
    employee.code = code;
    employee.name = name;
    // 0: 'employee', 1: 'farmer', 2: 'manager'
    employee.role = faker.random.number(2);
    employee.phoneNumber = faker.phone.phoneNumber();
    employee.isVerifiedPhoneNumber = faker.random.boolean();
    employee.avatar = 'https://i.imgur.com/KYSCd8a.jpg';
    return employee;
});
//# sourceMappingURL=EmployeeFactory.js.map