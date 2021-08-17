import { HttpError } from 'routing-controllers';

export class FarmNotFoundError extends HttpError {
    constructor() {
        super(404, 'Farm not found!');
    }
}
