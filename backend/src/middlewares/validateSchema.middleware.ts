import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
import { formatearErroresZod } from "../utils/zodError";

export function validateSchema<T>(schema: ZodType<T>) {

    return (
        req: Request<{}, {}, T>,
        res: Response,
        next: NextFunction
    ) => {

        const resultado = schema.safeParse(req.body);

        if (!resultado.success) {
            return res.status(400).json({
                mensaje: "Datos inválidos",
                errores: formatearErroresZod(resultado.error)
            });
        }

        req.body = resultado.data;

        next();
    };
}