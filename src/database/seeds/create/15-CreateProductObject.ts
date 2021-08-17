import { Factory, Seed, times } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';
import * as faker from 'faker';

import { ProductObject, Product, Area, Process } from '../../../api/models';

export class CreateProductObject implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const products = await connection.manager.find(Product, {
            relations: [
                'farm', 'farm.areas', 'farm.processes',
            ],
        });
        const areas = await connection.manager.find(Area, {select: ['id', 'productObjectsTotal']});
        const processes = await connection.manager.find(Process, {select: ['id', 'productObjectsTotal']});

        const productObjects: ProductObject[] = [];

        const seq = {};
        const seqArea = {};
        const seqProduct = {};
        const seqProcess = {};

        await times(products.length, async (i) => {
            // TODO: can change random range to reduce amount record
            // max amount can be up to 142,400 record product
            // (category x area x randomNum = 712 x 10 x 20)
            const amount = faker.random.number(10);

            for (let j = 0; j < amount; ++j) {
                const process = products[i].farm.processes[
                    faker.random
                        .number(products[i].farm.processes.length - 1)
                    ];
                const name = faker.commerce.productAdjective();
                const prefixCode = products[i].code;
                let indexCode = 1;

                if (seq.hasOwnProperty(prefixCode)) {
                    indexCode = ++seq[prefixCode];
                } else {
                    seq[prefixCode] = indexCode;
                }

                const productObject = await factory(ProductObject)({
                    productID: products[i].id,
                    processID: process.id,
                    areaID: products[i].farm.areas[0].id,
                    code: `${prefixCode}-${indexCode.toString().padStart(5, '0')}`,
                    name,
                }).make();
                productObjects.push(productObject);

                if (seqArea[productObject.areaID]) {
                    seqArea[productObject.areaID]++;
                } else {
                    seqArea[productObject.areaID] = 1;
                }

                if (seqProduct[productObject.productID]) {
                    seqProduct[productObject.productID]++;
                } else {
                    seqProduct[productObject.productID] = 1;
                }

                if (seqProcess[productObject.processID]) {
                    seqProcess[productObject.processID]++;
                } else {
                    seqProcess[productObject.processID] = 1;
                }
            }
        });

        for (const area of areas) {
            if (seqArea[area.id]) {
                area.productObjectsTotal = seqArea[area.id];
            }
        }

        for (const product of products) {
            if (seqProduct[product.id]) {
                product.productObjectsTotal = seqProduct[product.id];
            }
        }

        for (const process of processes) {
            if (seqProcess[process.id]) {
                process.productObjectsTotal = seqProcess[process.id];
            }
        }

        await connection.transaction(async (manager) => {
            await manager.save(productObjects, { chunk: 100 });
            await manager.save(areas, { chunk: 100 });
            await manager.save(products, { chunk: 100 });
            await manager.save(processes, { chunk: 100 });
        });
    }
}
