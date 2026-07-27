import type { Request, Response, NextFunction } from "express";

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
}