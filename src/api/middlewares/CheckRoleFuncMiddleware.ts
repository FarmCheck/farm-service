import { AuthHelper } from '../../auth/AuthHelper';
import { HttpError } from 'routing-controllers';
import { Logger } from '../../lib/logger';

export function CheckRoleFuncMiddleware(role: string):
    (req: any, res: any, next: (err?: any) => Promise<any>) => Promise<any> {
    return (req: any, res: any, next: (err?: any) => Promise<any>) => {
        const log = new Logger(__filename);

        try {
            const token = req.headers.authorization.split(' ', 2)[1];
            const payload = AuthHelper.getPayloadFromJWT(token);

            if (!payload.kind || payload.kind !== role) {
                throw new Error('Permission denied');
            }

            return next();
        } catch (error: any) {
            log.error(error.stack);
            throw new HttpError(403, 'Permission denied');
        }
    };
}

export const UserRoles = {
    admin: 'admin',
};
