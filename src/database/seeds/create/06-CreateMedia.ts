import { Factory, Seed } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';

import { Media } from '../../../api/models';

export class CreateMedia implements Seed {
    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const medias = await factory(Media)().makeMany(5000);
        await connection.manager.save(medias, {
            chunk: 100,
        });
    }
}
