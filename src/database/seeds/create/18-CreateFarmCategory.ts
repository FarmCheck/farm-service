import { Factory, Seed, times } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';
import * as Faker from 'faker';

import { Farm, Category, FarmCategory } from '../../../api/models';

export class CreateFarmCategory implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const farms = await connection.manager.find(Farm, { select: ['id']});
        const categories = await connection.manager.find(Category, { select: ['id']});
        const farmCategories: FarmCategory[] = [];

        await times(farms.length, async (i) => {
            const category = categories[Faker.random.number(categories.length - 1)];

            farmCategories.push(await factory(FarmCategory)({
                farmID: farms[i].id,
                categoryID: category.id,
            }).make());
        });

        await connection.manager.save(farmCategories, {
            chunk: 100,
        });
    }
}
