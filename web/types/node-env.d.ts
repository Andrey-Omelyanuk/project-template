declare namespace NodeJS {
    export interface ProcessEnv {
        AUTH_CLIENT_ID      : string
        AUTH_CLIENT_SECRET  : string
        AUTH_ISSUER         : string
        NEXTAUTH_URL        : string
        NEXTAUTH_SECRET     : string
    }
}