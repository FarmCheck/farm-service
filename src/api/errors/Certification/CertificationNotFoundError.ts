import { HttpError } from 'routing-controllers';

export class CertificationNotFoundError extends HttpError {
    constructor() {
        super(404, 'Certification not found!');
    }
}
