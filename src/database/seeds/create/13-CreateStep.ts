import { Factory, Seed, times } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';
import * as faker from 'faker';

import { Step, Process } from '../../../api/models';

export class CreateStep implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        //
        // The current typeorm-seeding used has bug which is about seeding simple-array
        // This bug was resolved in version 1.0.0
        //
        const processes = await connection.manager.find(Process);
        const steps: Step[] = [];
        await times(processes.length, async (i) => {
            const quantity = faker.random.number(5) + 5;
            await times(quantity, async (order) => {
                const step = await factory(Step)({
                    order,
                    processID: processes[i].id,
                }).make();
                steps.push(step);
            });
            processes[i].isHaveStep = true;
            processes[i].quantity = quantity;
        });
        await connection.transaction(async (manager) => {
            await manager.save(steps, {
                chunk: 100,
            });
            await manager.save(processes, {
                chunk: 100,
            });
        });
    }
}
