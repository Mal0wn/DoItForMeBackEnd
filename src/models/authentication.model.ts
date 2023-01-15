/* Defining the types of the data that will be used in the session. */
export interface Session {
    id: number;
    dateCreated: number;
    role: string;
    username: string;
    // Timestamp Unix milliseconds.
    issued: number; 
    expires: number;
}

/* Defining the types of the data that will be used in the PartialSession. */
export type PartialSession = Omit<Session, "issued" | "expires">;
/* Defining the types of the data that will be used in the EncodeResult. */
export interface EncodeResult {
    token: string,
    expires: number,
    issued: number,
}
/* Defining the types of the data that will be used in the DecodeResult. */
export type DecodeResult =
    | {
          type: "valid";
          session: Session;
      }
    | {
          type: "integrity-error";
      }
    | {
          type: "invalid-token";
      };
/* Defining the types of the data that will be used in the ExpirationStatus. */
export type ExpirationStatus = "expired" | "active" | "grace";