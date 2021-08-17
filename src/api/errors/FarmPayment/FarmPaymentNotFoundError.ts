import { HttpError } from 'routing-controllers';

export class FarmPaymentNotFoundError extends HttpError {
    constructor() {
        super(404, 'Farm payment not found!');
    }
}
