import { HttpError } from 'routing-controllers';

export class DiaryNotFoundError extends HttpError {
    constructor() {
        super(404, 'Diary not found!');
    }
}
