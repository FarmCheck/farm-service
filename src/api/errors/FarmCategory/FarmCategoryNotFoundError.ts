import { HttpError } from 'routing-controllers';

export class FarmCategoryNotFoundError extends HttpError {
    constructor() {
        super(404, 'Farm category not found!');
    }
}
