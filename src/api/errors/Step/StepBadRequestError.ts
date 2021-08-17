import { HttpError } from 'routing-controllers';

export class StepBadRequestError extends HttpError {
    constructor() {
        super(404, 'Step bad request!');
    }
}
