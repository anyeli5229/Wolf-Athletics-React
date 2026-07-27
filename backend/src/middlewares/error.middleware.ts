import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
    if(error instanceof AppError) {
        return res.status(error.statusCode).json({mensaje: error.message});
    }

    return res.status(500).json({mensaje: "Error interno del servidor"});
}