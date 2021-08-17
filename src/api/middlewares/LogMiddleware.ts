import * as express from 'express';
import morgan from 'morgan';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

import { env } from '../../env';
import { Logger } from '../../lib/logger';

@Middleware({ type: 'before', priority: 9 })
export class LogMiddleware implements ExpressMiddlewareInterface {

    private log = new Logger(__filename);

    public use(req: express.Request, res: express.Response, next: express.NextFunction): any {
        const requestLog = {
            remoteAddress: req.ip,
            method: req.method,
            path: req.path,
            headers: req.headers,
            query: req.query,
            body: req.body,
        };

        this.log.info('Request detail: \n' + JSON.stringify(requestLog));

        return morgan(
            env.log.output,
            {
                stream: {
                    write: this.log.info.bind(this.log),
                },
            }
        )(req, res, next);
    }
}
