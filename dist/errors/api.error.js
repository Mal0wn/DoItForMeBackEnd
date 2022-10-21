"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api500Error = exports.Api404Error = exports.Api400Error = exports.BaseError = void 0;
class BaseError extends Error {
    constructor(name, statusCode, isOperational, description) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}
exports.BaseError = BaseError;
const httpStatusCodes = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500
};
class Api400Error extends BaseError {
    constructor(name) {
        super(name, httpStatusCodes.BAD_REQUEST, true, 'Not Found.');
    }
}
exports.Api400Error = Api400Error;
class Api404Error extends BaseError {
    constructor(name) {
        super(name, httpStatusCodes.NOT_FOUND, true, 'Not Found.');
    }
}
exports.Api404Error = Api404Error;
class Api500Error extends BaseError {
    constructor(name) {
        super(name, httpStatusCodes.INTERNAL_SERVER, true, 'Not Found.');
    }
}
exports.Api500Error = Api500Error;
