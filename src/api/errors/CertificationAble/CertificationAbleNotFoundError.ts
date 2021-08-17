import { HttpError } from 'routing-controllers';

export class CertificationAbleNotFoundError extends HttpError {
    constructor() {
        super(404, 'Certification able not found!');
    }
}
