import { todoErrors } from './todoErrors.js';

export class authError extends todoErrors {
    constructor(message, status) {
        super(message, status);
    }
}
