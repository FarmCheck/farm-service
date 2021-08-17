import { HttpError } from 'routing-controllers';

export class FarmPaymentBadRequestError extends HttpError {
    constructor() {
        super(404, 'Farm payment bad request!');
    }
}
