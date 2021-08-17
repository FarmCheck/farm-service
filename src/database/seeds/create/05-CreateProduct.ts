import { Factory, Seed, times } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';
import * as faker from 'faker';

import { Farm, Location, Product, SubCategory } from '../../../api/models';
import { Helper } from '../../../common';

export class CreateProduct implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const subCategories = await connection.manager.find(SubCategory, { select: ['id', 'code']});
        const locations = await connection.manager.find(Location, { select: ['id']});
        const farms = await connection.manager.find(Farm, { select: ['id']});

        const seq = {};
        const seqFarm = {};
        const products: Product[] = [];

        await times(farms.length, async (i) => {
            const amount = faker.random.number(10);

            for (let j = 0; j < amount; ++j) {
                const subCategory = subCategories[faker.random.number(subCategories.length - 1)];
                const location = locations[faker.random.number(locations.length - 1)];
                const name = faker.commerce.product();
                const prefixCode = `${subCategory.code}-${await Helper.combineFirstCharacterAndLastWord(name)}`;
                let indexCode = 1;

                if (seq.hasOwnProperty(prefixCode)) {
                    indexCode = ++seq[prefixCode];
                } else {
                    seq[prefixCode] = indexCode;
                }

                const product = await factory(Product)({
                    farmID: farms[i].id,
                    subCategoryID: subCategory.id,
                    locationID: location.id,
                    code: `${prefixCode}-${indexCode.toString().padStart(4, '0')}`,
                    name,
                }).make();
                products.push(product);

                if (seqFarm[product.farmID]) {
                    seqFarm[product.farmID]++;
                } else {
                    seqFarm[product.farmID] = 1;
                }
            }
        });

        for (const farm of farms) {
            if (seqFarm[farm.id]) {
                farm.productsTotal = seqFarm[farm.id];
            }
        }

        await connection.transaction(async (manager) => {
            await manager.save(products, { chunk: 100 });
            await manager.save(farms);
        });
    }

}
