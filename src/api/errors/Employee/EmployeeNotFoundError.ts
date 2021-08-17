import { HttpError } from 'routing-controllers';

export class EmployeeNotFoundError extends HttpError {
    constructor() {
        super(404, 'Employee not found!');
    }
}
