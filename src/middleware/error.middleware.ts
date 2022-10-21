import { NextFunction, Response, Request } from "express"
import { BaseError } from "../errors/api.error"

export function logError(err: BaseError) {
    console.error(err)
}

export function logErrorMiddleware(err: BaseError, req: Request, res: Response, next: NextFunction) {
    logError(err);
    next(err);
}

export function returnError(err: BaseError, req: Request, res: Response, next: NextFunction) {
    res.status(err.statusCode || 500).send(err.message)
}

export function isOperationalError(err: Error): boolean {
    if (err instanceof BaseError) {
        return err.isOperational;
    }
    return false;
}