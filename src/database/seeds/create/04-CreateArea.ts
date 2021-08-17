import { Factory, Seed, times } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';
import * as Faker from 'faker';
import { Area, Employee, Farm } from '../../../api/models';
import { Helper } from '../../../common';

export class CreateArea implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const farms = await connection.manager.find(Farm, { relations: ['location'] });
        const employees = await connection.manager.find(Employee, {select: ['id']});
        const seq = {};
        const areas: Area[] = [];

        await times(farms.length, async (i) => {
            const randomAreaCount = Faker.random.number(2) + 1;
            await times(randomAreaCount, async () => {
                const name = Faker.address.city();
                const [provinceCode, nameCode] = await Promise.all([
                    Helper.combineFirstCharacterAndLastWord(farms[i].location.province),
                    Helper.combineFirstCharacterAndLastWord(name),
                ]);
                const prefixCode = `${provinceCode}-${nameCode}`;
                let indexCode = 1;

                if (seq.hasOwnProperty(prefixCode)) {
                    indexCode = ++seq[prefixCode];
                } else {
                    seq[prefixCode] = indexCode;
                }

                const employee = employees[Faker.random.number(employees.length - 1)];

                areas.push(await factory(Area)({
                    locationID: farms[i].location.id,
                    farmID: farms[i].id,
                    employeeID: employee.id,
                    code: `${prefixCode}-${indexCode.toString().padStart(4, '0')}`,
                    name,
                }).make());
            });
        });

        await connection.manager.save(areas, {
            chunk: 50,
        });
    }
}
