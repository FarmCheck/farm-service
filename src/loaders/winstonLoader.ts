import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { configure, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import { env } from '../env';

let transport = undefined;

switch (env.log.logDriver.toLowerCase()) {
    case 'console':
        transport = new transports.Console({
            level: env.log.level,
            handleExceptions: true,
            format: format.combine(format.colorize(), format.simple()),
        });
        break;
    case 'file':
        if (!env.log.logDir) {
            throw new Error('Log dir must be specified');
        }

        transport = new DailyRotateFile({
            filename: 'service-%DATE%.log',
            datePattern: 'DD-MM-YYYY',
            dirname: env.log.logDir,
            maxSize: env.log.logMaxSize,
            level: env.log.level,
            format: format.combine(format.simple()),
        });
        break;
    default:
        transport = undefined;
}

if (!transport) {
    throw new Error('Log driver is invalid');
}

export const winstonLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    configure({
        transports: [
            transport,
        ],
    });
};
