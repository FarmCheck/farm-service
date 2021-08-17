import { MicroframeworkLoader } from 'microframework-w3tec';
import { registerController } from 'cron-decorators';
import * as path from 'path';

export const cronJobLoader: MicroframeworkLoader = async () => {
    registerController([
        path.resolve(__dirname, '../api/cronjobs/*.{ts,js}'),
    ]);
};
