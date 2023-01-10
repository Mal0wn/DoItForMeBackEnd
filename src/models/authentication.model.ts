// INTERFACE : Session 
// For the Session Object
export interface Session {
    id: number;
    dateCreated: number;
    username: string;
    // Timestamp Unix milliseconds.
    issued: number; 
    expires: number;
}

// INTERFACE : PartialSession 
// For Session status
export type PartialSession = Omit<Session, "issued" | "expires">;

export interface EncodeResult {
    token: string,
    expires: number,
    issued: number
}

// INTERFACE : DecodeResult 
// To Decode JWT
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

// INTERFACE : ExpirationStatus 
// To Check JWt Status
export type ExpirationStatus = "expired" | "active" | "grace";