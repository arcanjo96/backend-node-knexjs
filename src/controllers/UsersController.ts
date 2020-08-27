import { Request, Response } from 'express';
import database from "../database/config/database";
import { hashPassowrd } from '../utils/bcrypt';

interface IUser {
    name: string;
    email: string;
    password: string;
}

export default class UsersController {
    async index(request: Request, response: Response) {
        try {
            const users = await database('users');
            return response.json(users);
        } catch (error) {
            return response.status(400).json({
                message: error
            });
        }
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const user = await database('users')
                .where({
                    id
                });

            return response.json(user);
        } catch (error) {
            return response.status(400).json({
                message: error
            });
        }
    }

    async create(request: Request, response: Response) {
        try {
            const user: IUser = request.body;

            user.password = await hashPassowrd(user.password);
            const createdUser = await database('users').insert(user).returning('*');
            const data = Object.assign(createdUser);
            delete data[0].password;
            return response.status(201).json(data);
        } catch (error) {
            console.log(error);
            return response.status(400).json({
                message: error
            });
        }
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const user: IUser = request.body;

            const findedUser = await database('users')
                .where({
                    id
                })
                .first();

            if (!findedUser) return response.status(404).json({
                message: 'Usuário não encontrado.'
            });

            if (user.password) {
                user.password = await hashPassowrd(user.password);
            }

            const updatedUser = await database('users')
                .where({ id })
                .update(user)
                .returning('*');

            return response.json(updatedUser);
        } catch (error) {
            return response.status(400).json({
                message: error
            });
        }

    }

    async remove(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const user = await database('users')
                .where({
                    id
                })
                .first();

            if (!user) return response.status(404).json({
                message: 'Usuário não encontrado.'
            });

            await database('users')
                .where({
                    id
                })
                .del();

            return response.json({
                message: 'Usuário excluído.'
            });
        } catch (error) {
            return response.status(400).json({
                message: error
            });
        }
    }
}
