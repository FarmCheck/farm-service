import { HttpError } from 'routing-controllers';

export class SubCategoryNotFoundError extends HttpError {
    constructor() {
        super(404, 'Sub category not found!');
    }
}
