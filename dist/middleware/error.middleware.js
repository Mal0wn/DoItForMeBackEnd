"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOperationalError = exports.returnError = exports.logErrorMiddleware = exports.logError = void 0;
const api_error_1 = require("../errors/api.error");
function logError(err) {
    console.error(err);
}
exports.logError = logError;
function logErrorMiddleware(err, req, res, next) {
    logError(err);
    next(err);
}
exports.logErrorMiddleware = logErrorMiddleware;
function returnError(err, req, res, next) {
    res.status(err.statusCode || 500).send(err.message);
}
exports.returnError = returnError;
function isOperationalError(err) {
    if (err instanceof api_error_1.BaseError) {
        return err.isOperational;
    }
    return false;
}
exports.isOperationalError = isOperationalError;
