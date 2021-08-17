import { HttpError } from 'routing-controllers';

export class StepNotFoundError extends HttpError {
    constructor() {
        super(404, 'Step not found!');
    }
}
