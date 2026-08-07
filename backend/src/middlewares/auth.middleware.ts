import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { JwtType, verificarJWT } from "../utils/jwt";

declare global {
    namespace Express {
        interface Request {
            usuario?: JwtType;
        }
    }
}

export function autenticarUsuario(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization
    if (!authorization) {
        throw new UnauthorizedError("Token inválido");
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedError("Token inválido");
    }

    try {
        const payload = verificarJWT(token);
        req.usuario = payload; 

        next();
    } catch (error) {
        throw new UnauthorizedError("Token inválido o expirado");
    }
}