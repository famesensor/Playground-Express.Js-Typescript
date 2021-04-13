import asyncHander from './async';
import ErrorReponse from '../utils/errorReponse/errorReponse';
import jwt from 'jsonwebtoken';
import { payloadToken } from '../interfaces/authen';

export const protect = asyncHander(async (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
    ) {
        let token = req.headers.authorization.split('Bearer ')[1];
        try {
            let verify = jwt.verify(
                token,
                process.env.SECRET_KEY!
            ) as payloadToken;

            req.user = {
                username: verify.username
            };

            next();
        } catch (err) {
            return next(new ErrorReponse('invalid token', 401));
        }
    } else {
        return next(new ErrorReponse('invalid token', 401));
    }
});
