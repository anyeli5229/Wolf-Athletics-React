import { AppError } from "./AppError";


export class BadRequestError extends AppError {
    constructor(menssage: string) {
        super(menssage, 400);
    }
}