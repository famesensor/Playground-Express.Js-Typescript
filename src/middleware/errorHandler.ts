import { Request, Response, NextFunction } from 'express';
import ErrorReponse from '../utils/errorReponse/errorReponse';

interface ErrorReponseExtend extends ErrorReponse {
    code?: number;
    message: string | any;
    errors?: any;
}

const errorHandler = (
    err: ErrorReponseExtend,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let error = { ...err };

    error.message = err.message;
    console.log(err);

    // mongoose validation error
    if (err.name === 'ValidattionError') {
        const errors: {
            [key: string]: string;
        } = {};
        Object.values<{
            [key: string]: string;
        }>(err.errors).forEach((val) => (errors[val.path] = val.message));
        error.message = errors; // new assigned way
        error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
        status: 'failed',
        message: error.message || `Internal server error`
    });
};

export default errorHandler;
