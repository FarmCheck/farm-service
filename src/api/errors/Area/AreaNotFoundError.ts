import { HttpError } from 'routing-controllers';

export class AreaNotFoundError extends HttpError {
    constructor() {
        super(404, 'Area not found!');
    }
}
