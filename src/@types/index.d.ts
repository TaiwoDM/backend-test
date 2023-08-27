import express from "express";
import * as jwt from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            user?: {
                email: string,
                admin: Boolean
            }
            file?: any
        }
    }
}

declare global {
    namespace jwt {
        interface JwtPayload {
            email?: string
        }
    }
}
