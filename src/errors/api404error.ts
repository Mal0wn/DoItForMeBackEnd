import { BaseError, httpStatusCodes } from "./baseError"

export class Api404Error extends BaseError {
    constructor(name: string) {
        super(name, httpStatusCodes.NOT_FOUND, true, 'Not Found.');
    }
}