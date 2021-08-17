import { HttpError } from 'routing-controllers';

export class MediaAbleNotFoundError extends HttpError {
    constructor() {
        super(404, 'Media able not found!');
    }
}
