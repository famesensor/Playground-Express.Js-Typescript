import { Request, Response, NextFunction } from 'express';

const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) =>
    function asyncWarp(req: Request, res: Response, next: NextFunction) {
        return Promise.resolve(fn(req, res, next)).catch(next);
    };

export default asyncHandler;
