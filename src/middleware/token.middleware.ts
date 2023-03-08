/* Importing the Request, Response, and NextFunction interfaces from the express module. */
import { Request, Response, NextFunction } from "express";
import { DecodeResult, EncodeResult, ExpirationStatus, PartialSession, Session, } from "../models/authentication.model";
import { encode, TAlgorithm, decode } from "jwt-simple";

/**
 * It takes a request, response, and next function as parameters, and if the request has a valid JWT,
 * it will call the next function.
 * @param {Request} request - The request object.
 * @param {Response} response - The response object.
 * @param {NextFunction} next - A function to call when the middleware is complete.
 */
    export function securityJWTMiddleware(request: Request, response: Response, next: NextFunction) {

    /**
     * It returns a 401 status code with a message.
     * @param {string} message - The message to be displayed to the user.
     */
    const unauthorized = (message: string) => response.status(401).json({
        ok: false,
        status: 401,
        message: message
    });

    /* Getting the authorization header from the request. */
    let header : any = request.headers.authorization;
    header = header.slice(7)

    if (!header) {
        unauthorized(`Required header not found.`);
        return;
    }

   const decodedSession: DecodeResult = decodeSession(`${process.env.SECRET_KEY_JWT}`, header);
    
    if (decodedSession.type === "integrity-error" || decodedSession.type === "invalid-token") {
        unauthorized(`Failed to decode or validate authorization token. Reason: ${decodedSession.type}.`);
        return;
    }

    const expiration: ExpirationStatus = checkExpirationStatus(decodedSession.session);

    if (expiration === "expired") {
        unauthorized(`Authorization token has expired. Please create a new authorization token.`);
        return;
    }

    let session: Session;

    if (expiration === "grace") {
        const { token, expires, issued } = encodeSession(`${process.env.SECRET_KEY_JWT}`, decodedSession.session);
        session = {
            ...decodedSession.session,
            expires: expires,
            issued: issued
        };
        response.setHeader("authorization", token);
    } else {
        session = decodedSession.session;
    }

    //Set the session on response.locals object for routes to access
    response.locals = {
        ...response.locals,
        session: session
    };

    //If Session is OK, access to called route and function
    next();
}

/**
 * It takes a secret key and a partial session, and returns an encoded token, the issued time, and the
 * expiration time
 * @param {string} secretKey - The secret key used to encode the token.
 * @param {PartialSession} partialSession - This is the session data that you want to encode.
 * @returns An object with a token, issued, and expires.
 */
export function encodeSession(secretKey: string, partialSession: PartialSession): EncodeResult {
    const algorithm: TAlgorithm | string= `${process.env.ALGO_TOKEN_DECODE}`;
    const issued : number = Date.now();
    const tokenDurationInMs =  `${process.env.TOKEN_DURATION}`;
    const expires : number = issued + +tokenDurationInMs;
    const session: Session = {
        ...partialSession,
        issued: issued,
        expires: expires
    };

    return {
        token: encode(session, secretKey, algorithm),
        issued: issued,
        expires: expires
    };
}

export function decodeSession(secretKey: string, tokenString: string): DecodeResult {
    const algorithm: TAlgorithm | string= `${process.env.ALGO_TOKEN_DECODE}`;
    let result: Session;

    try {
        result = decode(tokenString, secretKey, false, algorithm);
    } catch (_e: any) {
        const e: Error = _e;
        console.log(e)
        
        if (e.message === "No token supplied" || e.message === "Not enough or too many segments") {
            return {
                type: "invalid-token"
            };
        }

        if (e.message === "Signature verification failed" || e.message === "Algorithm not supported") {
            return {
                type: "integrity-error"
            };
        }

        if (e.message.indexOf("Unexpected token") === 0) {
            return {
                type: "invalid-token"
            };
        }
        throw e;
    }

    return {
        type: "valid",
        session: result
    }
}

export function checkExpirationStatus(token: Session): ExpirationStatus {
    const now = Date.now();
    if (token.expires > now) return "active";
    const durationRefreshTokenInMs = `${process.env.ALGO_TOKEN_DECODE}`;
    const afterExpiration = token.expires + +durationRefreshTokenInMs;

    if (afterExpiration > now) return "grace";

    return "expired";
}

export function checkTokenValidityAndExpiration(token: string): boolean {
    const tmp = ( decodeSession(`${process.env.SECRET_KEY_JWT}`, token) as any);
    if (tmp.hasOwnProperty('session')){
        if ( checkExpirationStatus(tmp.session) != "expired"){
            return true;
        }
    }
    return false;
}