import { Location } from '../../../api/models';
import { Provinces, Districts } from '../../init/Location';
import { createConnection } from 'typeorm';
import * as uuid from 'uuid';
import { Helper } from '../../../common';

Helper.getLoadedConnectionOptions().then(async connectionOptions => {
    createConnection(connectionOptions)
        .then(async connection => {
            console.log('Seeding location...');

            for (const district of Districts) {
                for (const province of Provinces) {
                    if (district.provincecode === province.code) {
                        const location = new Location();
                        location.id = uuid.v1();
                        location.province = province.name;
                        location.provinceCode = province.code;
                        location.district = district.name;
                        location.districtCode = district.code;

                        await connection.manager.save(location);
                    }
                }
            }
        });
});
