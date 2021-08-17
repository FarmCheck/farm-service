import { HttpError } from 'routing-controllers';

export class LocationNotFoundError extends HttpError {
    constructor() {
        super(404, 'Location not found!');
    }
}
