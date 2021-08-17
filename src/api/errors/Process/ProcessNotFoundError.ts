import { HttpError } from 'routing-controllers';

export class ProcessNotFoundError extends HttpError {
    constructor() {
        super(404, 'Process not found!');
    }
}
