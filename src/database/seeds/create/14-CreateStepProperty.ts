import { Factory, Seed, times } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';

import { StepProperty, Step } from '../../../api/models';

export class CreateStepProperty implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const steps = await connection.manager.find(Step);
        const stepProperties: StepProperty[] = [];

        await times(steps.length, async (i) => {
            stepProperties.push(await factory(StepProperty)({stepID: steps[i].id}).make());
        });

        await connection.manager.save(stepProperties, {
            chunk: 100,
        });
    }
}
