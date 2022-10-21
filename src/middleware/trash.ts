import { NextFunction, Response, Request } from "express"
import { BaseError } from "../errors/baseError"

function logError(err: BaseError) {
    console.error(err)
}

function logErrorMiddleware(err: BaseError, req: Request, res: Response, next: NextFunction) {
    logError(err);
    next(err);
}

function returnError(err: BaseError, req: Request, res: Response, next: NextFunction) {
    res.status(err.statusCode || 500).send(err.message)
}

function isOperationalError(err: Error) {
    if (err instanceof BaseError) {
        return err.isOperational
    }
    return false
}