import { Factory, Seed } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';

import { Organization } from '../../../api/models';

export class CreateOrganization implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        await factory(Organization)().seedMany(30);
    }
}
