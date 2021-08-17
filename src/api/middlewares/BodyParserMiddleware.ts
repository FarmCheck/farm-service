import * as express from 'express';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import bodyParser from 'body-parser';

@Middleware({ type: 'before', priority: 10 })
export class BodyParserMiddleware implements ExpressMiddlewareInterface {

    private readonly jsonBodyParser;

    constructor() {
        this.jsonBodyParser = bodyParser.json();
    }

    public use(req: express.Request, res: express.Response, next: express.NextFunction): any {
        this.jsonBodyParser(req, res, next);
    }
}
