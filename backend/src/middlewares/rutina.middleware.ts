import { Request, Response, NextFunction } from "express";
import { rutinaSchema } from "../schemas/rutina.schema";
import { formatearErroresZod } from "../utils/zodError";

export function validarRutina(req: Request, res: Response, next: NextFunction){

    const resultado = rutinaSchema.safeParse(req.body);

    if (!resultado.success) {
        return res.status(400).json({
            mensaje: "Datos inválidos",
            errores: formatearErroresZod(resultado.error)
        });
    }

    next();

}

export function validarId(req: Request<{id: string}>, res: Response, next: NextFunction) {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({mensaje: "ID no válido"});
    }
    next();
}