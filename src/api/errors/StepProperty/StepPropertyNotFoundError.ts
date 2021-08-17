import { HttpError } from 'routing-controllers';

export class StepPropertyNotFoundError extends HttpError {
    constructor() {
        super(404, 'Step property not found!');
    }
}
