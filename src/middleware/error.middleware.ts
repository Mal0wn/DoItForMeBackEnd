import { NextFunction, Response, Request } from "express"
import { BaseError } from "../errors/api.error"

function logError(err: BaseError) {
    console.error(err)
}

export function errorMiddleware(err: BaseError, req: Request, res: Response, next: NextFunction) {
    res.status(err.statusCode || 500).send(err.message);
    next(err);
}

export function isOperationalError(err: Error): boolean {
    if (err instanceof BaseError) {
        return err.isOperational;
    }
    return false;
}