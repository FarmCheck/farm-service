import { HttpError } from 'routing-controllers';

export class ProductObjectNotFoundError extends HttpError {
    constructor() {
        super(404, 'Product object not found!');
    }
}
