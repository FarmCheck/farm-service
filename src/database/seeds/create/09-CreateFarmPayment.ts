import { Factory, Seed, times } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';
import { FarmPayment, Farm } from '../../../api/models';

export class CreateFarmPayment implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const farms = await connection.manager.find(Farm);

        const payments = await times(farms.length, async (i) => {
            return await factory(FarmPayment)({farmID: farms[i].id}).make();
        });
        await connection.manager.save(payments, {
            chunk: 100,
        });
    }
}
