import { createConnection } from 'typeorm';
import uuid from 'uuid';

import targetTypes from '../../init/TargetType';
import { TargetType } from '../../../api/models';
import { Helper } from '../../../common';

Helper.getLoadedConnectionOptions().then(async connectionOptions => {
    createConnection(connectionOptions)
        .then(async connection => {
            console.log('Seeding target type...');

            for (const targetType of targetTypes) {
                const entity = new TargetType();
                entity.id = uuid.v1();
                entity.name = targetType.name;

                await connection.manager.save(entity);
            }
        });
});
