import { Factory, Seed, times } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';
import * as Faker from 'faker';

import { Process, Farm } from '../../../api/models';
import { Helper } from '../../../common';

export class CreateProcess implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const farms = await connection.manager.find(Farm);
        const seq = {};
        const processes: Process[] = [];

        await times(farms.length, async (i) => {
            for (let j = 0; j < 2; ++j) {
                const name = Faker.commerce.productName();
                const prefixCode = await Helper.combineFirstCharacterAndLastWord(name);
                let indexCode = 1;

                if (seq.hasOwnProperty(prefixCode)) {
                    indexCode = ++seq[prefixCode];
                } else {
                    seq[prefixCode] = indexCode;
                }

                processes.push(await factory(Process)({
                    farmID: farms[i].id,
                    code: `${prefixCode}-${indexCode.toString().padStart(4, '0')}`,
                    name,
                }).make());
            }
        });

        await connection.manager.save(processes, { chunk: 100 });
    }
}
