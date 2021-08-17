import { Factory, Seed, times } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';
import * as Faker from 'faker';

import { Employee, Farm } from '../../../api/models';
import { Helper } from '../../../common';

export class CreateEmployee implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const farms = await connection.manager.find(Farm);
        const seq = {};

        await times(farms.length, async (i) => {
            for (let j = 0; j < 2; ++j) {
                const name = Faker.name.firstName() + ' ' + Faker.name.lastName();
                const prefixCode = await Helper.combineFirstCharacterAndLastWord(name);
                let indexCode = 1;

                if (seq.hasOwnProperty(prefixCode)) {
                    indexCode = ++seq[prefixCode];
                } else {
                    seq[prefixCode] = indexCode;
                }

                await factory(Employee)({
                    farmID: farms[i].id,
                    code: `${prefixCode}-${indexCode.toString().padStart(4, '0')}`,
                    name,
                }).seed();
            }
        });
    }
}
