import { Request, Response } from 'express';
import database from "../database/config/database";
import { v4 as uuidv4 } from 'uuid';

interface IAnnotation {
    uid: string;
    user_id: number;
    text: string;
}

export default class AnnotationsController {
    async index(request: Request, response: Response) {
        const { userId } = request;

        try {
            const annotations = await database('annotations')
                .where('annotations.user_id', '=', userId)
                .join('users', 'annotations.user_id', 'users.id')
                .select(['users.*', 'annotations.*'])

            return response.json(annotations);
        } catch (error) {
            return response.status(400).json({
                message: error
            });
        }
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const { userId } = request;

        try {
            const annotation = await database('annotations')
                .where('annotations.id', '=', id)
                .where('annotations.user_id', '=', userId)
                .join('users', 'annotations.user_id', 'users.id')
                .select(['users.*', 'annotations.*'])

            return response.json(annotation);
        } catch (error) {
            console.log(error);
            return response.status(400).json({
                message: error
            });
        }
    }

    async create(request: Request, response: Response) {
        try {
            const annotation: IAnnotation = request.body;

            annotation.uid = uuidv4();
            const createdAnnotation = await database('annotations').insert(annotation).returning('*');

            return response.status(201).json(createdAnnotation);
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
            const annotation: IAnnotation = request.body;

            const findedAnnotation = await database('annotations')
                .where({
                    id
                })
                .first();

            if (!findedAnnotation) return response.status(404).json({
                message: 'Anotação não encontrada.'
            });

            const updatedAnnotation = await database('annotations')
                .where({ id })
                .update(annotation)
                .returning('*');

            return response.json(updatedAnnotation);
        } catch (error) {
            console.log(error);
            return response.status(400).json({
                message: error
            });
        }

    }

    async remove(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const annotation = await database('annotations')
                .where({
                    id
                })
                .first();

            if (!annotation) return response.status(404).json({
                message: 'Anotação não encontrada.'
            });

            await database('annotations')
                .where({
                    id
                })
                .del();

            return response.json({
                message: 'Anotação excluída.'
            });
        } catch (error) {
            return response.status(400).json({
                message: error
            });
        }
    }
}
