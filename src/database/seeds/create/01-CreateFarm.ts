import { Factory, Seed, times } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';
import axios from 'axios';
import * as Faker from 'faker';

import { Farm, Location } from '../../../api/models';
import { env } from '../../../env';
import { Helper } from '../../../common';

export class CreateFarm implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const locations = await connection.manager.find(Location);

        // get list user ID in User Service
        const userRes: any = await axios.create({baseURL: env.farmhub.userService})({
            url: '/users/another-service/list-id',
            // headers: {authorization: `Bearer ${token}`},
            method: 'GET',
        });
        const { data } = userRes;
        const { data: userIDs } = data;
        const seq = {};

        await times(locations.length, async (i) => {
            const idx = Math.floor(Math.random() * userIDs.length);
            const name = Faker.address.city();
            const [provinceCode, nameCode] = await Promise.all([
                Helper.combineFirstCharacterAndLastWord(locations[i].province),
                Helper.combineFirstCharacterAndLastWord(name),
            ]);
            const prefixCode = `${provinceCode}-${nameCode}`;
            let indexCode = 1;

            if (seq.hasOwnProperty(prefixCode)) {
                indexCode = ++seq[prefixCode];
            } else {
                seq[prefixCode] = indexCode;
            }
            const farm = await factory(Farm)({
                locationID: locations[i].id,
                userID: userIDs[idx],
                code: `${prefixCode}-${indexCode.toString().padStart(4, '0')}`,
                name,
            }).seed();

            // sync farm ID amd user ID in Identity Service
            await axios.create({baseURL: env.farmhub.identityService})({
                url: '/farm',
                // headers: {authorization: `Bearer ${token}`},
                method: 'POST',
                data: {farmId: farm.id, userId: farm.userID},
            });
        });
    }
}
