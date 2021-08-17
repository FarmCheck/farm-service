import { Action, HttpError } from 'routing-controllers';
import { Connection } from 'typeorm';
import { AuthHelper } from './AuthHelper';
import { Logger } from '../lib/logger';

export function currentUserChecker(connection: Connection): (action: Action) => Promise<any> {
    return async function innerCurrentUserChecker(action: Action): Promise<any> {
        const log = new Logger(__filename);
        try {
            // @ts-ignore
            const [_, token] = action.request.headers.authorization.split(' ', 2);
            return AuthHelper.getPayloadFromJWT(token);
        } catch (error: any) {
            log.error(error.stack);
            throw new HttpError(401, 'Invalid token');
        }
    };
}
