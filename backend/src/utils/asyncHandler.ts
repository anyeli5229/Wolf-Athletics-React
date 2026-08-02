import type { Request, Response, NextFunction } from "express";

//Función que toma un controlador(fn), ya no es necesario escribir try/catch o promise, porque ya lo hace esta función
export function asyncHandler<P = {}, ResBody = any, ReqBody = any>(fn: (req: Request<P, ResBody, ReqBody>, res: Response<ResBody>, next: NextFunction) => any) {
    
    return (
        req: Request<P, ResBody, ReqBody>,
        res: Response<ResBody>,
        next: NextFunction
    ) => {

        Promise
            .resolve(fn(req, res, next))
            .catch(next);

    };
}//Regresa un promise o le dice a express que hay un error next(error)