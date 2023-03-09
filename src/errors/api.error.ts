export class BaseError extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor(name: string, statusCode: number, isOperational: boolean, description: string) {
        super(description)

        Object.setPrototypeOf(this, new.target.prototype)
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}

const httpStatusCodes = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500
}

export class Api400Error extends BaseError {
    constructor(message: string) {
        super('Bad Request', httpStatusCodes.BAD_REQUEST, true, message);
    }
}

export class Api404Error extends BaseError {
    constructor(message: string) {
        super('Not Found', httpStatusCodes.NOT_FOUND, true, message);
    }
}

export class Api500Error extends BaseError {
    constructor(message: string) {
        super('Internal Server Error', httpStatusCodes.INTERNAL_SERVER, true, message);
    }
}