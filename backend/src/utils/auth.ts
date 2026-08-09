import { Request } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { JwtType } from "./jwt";

export function obtenerUsuarioAutenticado(req: Request) : JwtType {
    if(!req.usuario) {
        throw new UnauthorizedError("Usuario no autenticado");
    }

    return req.usuario;
}