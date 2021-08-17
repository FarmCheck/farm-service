import { HttpError } from 'routing-controllers';

export class MediaNotFoundError extends HttpError {
    constructor() {
        super(404, 'Media not found!');
    }
}
