import { Action, HttpError } from 'routing-controllers';
import { Connection } from 'typeorm';
import { env } from '../env';
import { Logger } from '../lib/logger';
import { AuthHelper } from './AuthHelper';
import axios from 'axios';

function getActionFromMethod(method: string): string {
    switch (method.toLowerCase()) {
        case 'get':
            return 'get';
        case 'post':
            return 'create';
        case 'put':
        case 'path':
            return 'update';
        case 'delete':
            return 'delete';
        default:
            return 'unknown';
    }
}

export function authorizationChecker(connection: Connection): (action: Action, roles: any[]) => Promise<boolean> | boolean {
    return async function innerAuthorizationChecker(action: Action, roles: string[]): Promise<boolean> {
        const logger = new Logger(__filename);
        const isDebugHeader = action.request.headers['is-debug'];

        // ignore check token for quick debug
        if (env.node === 'development' && isDebugHeader) {
            return true;
        }

        try {
            // @ts-ignore
            // tslint:disable-next-line:prefer-const
            let controller = action.request.url.replace(env.app.routePrefix + '/', '').split('/', 2)[0];
            controller = controller.split('?')[0];

            // @ts-ignore
            const [_2, token] = action.request.headers.authorization.split(' ', 2);
            const jwtPayload = AuthHelper.getPayloadFromJWT(token);

            if (!controller || !token) {
                return false;
            }

            const method = getActionFromMethod(action.request.method);
            const permission = `farm.${jwtPayload.farmID}.${controller}.${method}`;

            logger.info(`make POST ${env.farmhub.identityService}permission/verify?action=${permission}`);
            await axios.create({baseURL: env.farmhub.identityService})({
                url: '/permission/verify',
                headers: {authorization: `Bearer ${token}`},
                method: 'POST',
                params: {action: permission},
            });
        } catch (resError: any) {
            if (resError.response) {
                logger.error(`[Identity Service response] ${resError.response.status} ${resError.response.data.message}`);
                action.response.status(resError.response.status);
                throw new HttpError(resError.response.status, resError.response.data.message);
            } else {
                logger.error(resError.stack);
                return false;
            }
        }

        return true;
    };
}
