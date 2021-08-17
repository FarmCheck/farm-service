import { Factory, Seed, times } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';

import { Section, ProductObject } from '../../../api/models';
import Faker from 'faker';
import { Helper } from '../../../common';

export class CreateSection implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const productObjects = await connection.manager.find(ProductObject);
        const seq = {};
        const sections: Section[] = [];

        await times(productObjects.length, async (i) => {
            for (let j = 0; j < 3; ++j) {
                const name = Faker.commerce.productName();
                const prefixCode = await Helper.combineFirstCharacterAndLastWord(name);
                let indexCode = 1;

                if (seq.hasOwnProperty(prefixCode)) {
                    indexCode = ++seq[prefixCode];
                } else {
                    seq[prefixCode] = indexCode;
                }

                const section = await factory(Section)({
                    productObjectID: productObjects[i].id,
                    processID: productObjects[i].processID,
                    areaID: productObjects[i].areaID,
                    code: `${prefixCode}-${indexCode.toString().padStart(4, '0')}`,
                    name,
                }).make();
                sections.push(section);
            }
        });
        await connection.manager.save(sections, {
            chunk: 100,
        });
    }
}
