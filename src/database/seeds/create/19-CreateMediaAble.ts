import { Factory, Seed, times } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';

import {
    Area,
    Farm,
    Media,
    MediaAble,
    Product,
    ProductObject, TargetType
} from '../../../api/models';
import faker from 'faker';

export class CreateMediaAble implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const products = await connection.manager.find(Product, { select: ['id']});
        const areas = await connection.manager.find(Area, { select: ['id']});
        const farms = await connection.manager.find(Farm, { select: ['id']});
        const productObjects = await connection.manager.find(ProductObject, { select: ['id']});
        const targetTypes = await connection.manager.find(TargetType);
        const medias = await connection.manager.find(Media, { select: ['id']});

        const entities: MediaAble[] = [];

        const { id: targetTypeProductID } = targetTypes.find(e => e.name === 'product');
        await times(products.length, async (i) => {
            entities.push(
                await this.createNewMediaAble(factory, connection, medias,
                    { targetID: products[i].id, targetTypeID: targetTypeProductID })
            );
        });

        const { id: targetTypeAreaID } = targetTypes.find(e => e.name === 'area');
        await times(areas.length, async (i) => {
            entities.push(
                await this.createNewMediaAble(factory, connection, medias,
                    { targetID: areas[i].id, targetTypeID: targetTypeAreaID })
            );
        });

        const { id: targetTypeFarmID } = targetTypes.find(e => e.name === 'farm');
        await times(farms.length, async (i) => {
            entities.push(
                await this.createNewMediaAble(factory, connection, medias,
                { targetID: farms[i].id, targetTypeID: targetTypeFarmID })
            );
        });

        const { id: targetTypeProductObjectID } = targetTypes.find(e => e.name === 'product_object');
        await times(productObjects.length, async (i) => {
            entities.push(
                await this.createNewMediaAble(factory, connection, medias,
                { targetID: productObjects[i].id, targetTypeID: targetTypeProductObjectID })
            );
        });

        await connection.manager.save(entities, {
            chunk: 100,
        });
    }

    public async createNewMediaAble(factory: Factory, connection: Connection, medias: Media[], target: any): Promise<MediaAble> {
        const media = medias[faker.random.number(medias.length - 1)];
        const { targetID, targetTypeID } = target;

        return await factory(MediaAble)({
            targetID,
            targetTypeID,
            mediaID: media.id,
        }).make();
    }
}
