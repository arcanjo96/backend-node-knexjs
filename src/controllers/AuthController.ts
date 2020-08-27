import { Request, Response } from 'express';
import database from "../database/config/database";
import { comparePassword } from '../utils/bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET } from '../utils/contants';

interface IAuth {
    email: string;
    password: string;
}

export default class AuthController {
    async login(request: Request, response: Response) {
        try {
            const user: IAuth = request.body;

            const findedUser = await database('users')
                .where('email', '=', user.email)
                .first();

            if (!findedUser) {
                return response.status(404).json({
                    message: 'Usuário não encontrado.'
                });
            }

            if (!await comparePassword(user.password, findedUser.password)) {
                return response.status(404).json({
                    message: 'Usuário/senha incorreta.'
                });
            }

            const token = jwt.sign({ user_id: findedUser.id }, SECRET, {
                expiresIn: '7d'
            });

            return response.json({
                token,
                user: {
                    id: findedUser.id,
                    name: findedUser.name,
                    email: findedUser.email
                }
            });
        } catch (error) {
            console.log(error);
            return response.status(400).json({
                message: error
            });
        }
    }
}