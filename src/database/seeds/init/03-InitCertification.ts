import { createConnection } from 'typeorm';
import uuid from 'uuid';

import certifications from '../../init/Certification';
import { Certification } from '../../../api/models';
import { Helper } from '../../../common';

Helper.getLoadedConnectionOptions().then(async connectionOptions => {
    createConnection(connectionOptions)
        .then(async connection => {
            console.log('Seeding certification...');

            for (const certification of certifications) {
                const entity = new Certification();
                entity.id = uuid.v1();
                entity.name = certification.name;
                entity.code = certification.code;
                entity.logo = certification.logo;

                await connection.manager.save(entity);
            }
        });
});
