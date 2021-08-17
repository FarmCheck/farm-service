import { Repository } from 'typeorm';
import { HttpError } from 'routing-controllers';
import { Logger } from '../lib/logger';

export class AuthHelper {

    public static getPayloadFromJWT(jwt: string): any {
        // @ts-ignore
        const [_header, payloadBase64, _etc] = jwt.split('.', 3);
        const payloadString = Buffer.from(payloadBase64, 'base64').toString();
        return JSON.parse(payloadString);
    }

    public static authQueryByWhereParam(source: any, user: any, compareField: {
        inEntity: string,
        inUser: string,
    }): any {
        const log = new Logger(__filename);

        try {
            let valueCheckOfEntity = source;
            const fields = compareField.inEntity.split('.');

            for (const field of fields) {
                valueCheckOfEntity = valueCheckOfEntity[field];
            }

            if (!valueCheckOfEntity || !user[compareField.inUser] || valueCheckOfEntity !== user[compareField.inUser]) {
                throw new Error('Forbidden');
            }
        } catch (error: any) {
            log.error(error.stack);
            throw new HttpError(403, 'Forbidden');
        }
    }

    public static authQuery(
        valueCheck: string,
        compareField: string,
        user: any
    ): any {
        if (!valueCheck || !user[compareField] || valueCheck !== user[compareField]) {
            throw new HttpError(403, 'Forbidden');
        }
    }

    public static async authQueryNeedFinding(
        repository: Repository<any>,
        id: string,
        compareField: {
            inEntity: string,
            inUser: string,
        },
        user: any,
        relations: string[] = []
    ): Promise<any> {
        if (!id) {
            throw new HttpError(403, 'Forbidden');
        }

        const entity = await repository.findOne(id, {relations});

        if (!user[compareField.inUser] || !entity) {
            throw new HttpError(403, 'Forbidden');
        }

        let valueCheckOfEntity = entity;
        const fields = compareField.inEntity.split('.');

        for (const field of fields) {
            valueCheckOfEntity = valueCheckOfEntity[field];
        }

        if (valueCheckOfEntity !== user[compareField.inUser]) {
            throw new HttpError(403, 'Forbidden');
        }
    }

    public static async authQueryByWhereParamNeedFinding(
        repository: Repository<any>,
        where: any,
        compareField: {
            idField: string,
            inEntity: string,
            inUser: string,
        },
        user: any,
        relations: string[] = []
    ): Promise<any> {
        const log = new Logger(__filename);

        try {
            let idValue = where;
            let fields = compareField.idField.split('.');

            for (const field of fields) {
                idValue = idValue[field];
            }

            if (!idValue) {
                throw new Error('Forbidden');
            }

            const entity = await repository.findOne(idValue, {relations});

            if (!user[compareField.inUser] || !entity) {
                throw new Error('Forbidden');
            }

            let valueCheckOfEntity = entity;
            fields = compareField.inEntity.split('.');

            for (const field of fields) {
                valueCheckOfEntity = valueCheckOfEntity[field];
            }

            if (valueCheckOfEntity !== user[compareField.inUser]) {
                throw new Error('Forbidden');
            }
        } catch (error: any) {
            log.error(error.stack);
            throw new HttpError(403, 'Forbidden');
        }
    }
}
