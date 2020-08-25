import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET } from '../utils/contants';

export const verifyToken = (request: Request, response: Response, next: NextFunction) => {
    const header = request.header('authorization');

    if (!header) {
        return response.status(401).json({
            message: 'Token não enviado.'
        });
    }

    const [type, token] = header.split(' ');

    jwt.verify(token, SECRET, function (err, decoded: any) {
        if (err) return response.status(401).json({
            message: 'Token inválido.'
        });

        request.userId = decoded.user_id;
        next();
    });
}