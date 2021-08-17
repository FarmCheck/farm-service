import { HttpError } from 'routing-controllers';

export class TargetTypeNotFoundError extends HttpError {
    constructor() {
        super(404, 'Target type not found!');
    }
}
