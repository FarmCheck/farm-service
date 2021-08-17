import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { Employee } from '../../api/models';

define(Employee, (faker: typeof Faker, settings: {
    farmID: string,
    code: string,
    name: string,
}) => {
    const { farmID, code, name} = settings;
    const employee = new Employee();

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
