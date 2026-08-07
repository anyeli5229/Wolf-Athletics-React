import { Request, Response } from "express";
import { login, register } from "../services/auth.services";
import { BadRequestError } from "../errors/BadRequestError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { generarJWT } from "../utils/jwt";

export async function registro(req: Request, res: Response) {
    const usuario = await register(req.body);
    if (!usuario) {
        throw new BadRequestError("El email que ingresaste ya se encuentra registrado");
    }

    const { password, ...usuarioSinPassword } = usuario;

    res.status(201).json({
        mensaje: "Usuario registrado correctamente",
        usuario: usuarioSinPassword
    });
}

export async function iniciarSesion(req: Request, res: Response) {
    const usuario = await login(req.body);
    if (!usuario) {
        throw new UnauthorizedError("Credenciales inválidas");
    }

    const token = generarJWT({
        id: usuario.id,
        email: usuario.email,
    })

    const { password, ...usuarioSinPassword } = usuario;

    res.json({
        mensaje: "Inicio de sesión correcto",
        usuario: usuarioSinPassword,
        token
    });
}

export async function auth(req: Request, res: Response) {
    if (!req.usuario) {
        throw new UnauthorizedError("Usuario no autenticado");
    }

    res.json({
        usuario: {
            id: req.usuario.id,
            email: req.usuario.email
        }
    });
}