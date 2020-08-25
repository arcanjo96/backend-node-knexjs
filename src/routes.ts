import express from 'express';

import UsersController from './controllers/UsersController';
import AnnotationsController from './controllers/AnnotationsController';
import AuthController from './controllers/AuthController';
import { verifyToken } from './middleware/auth';

const usersController = new UsersController();
const annotationsController = new AnnotationsController();
const authController = new AuthController();

const routes = express.Router();

// Routes for Authentication
routes.post('/login', authController.login);

// Routes for Users
routes.get('/users', usersController.index);
routes.get('/users/:id', usersController.show);
routes.post('/users', usersController.create);
routes.put('/users/:id', usersController.update);
routes.delete('/users/:id', usersController.remove);

// Routes for Annotations
routes.get('/annotations', verifyToken, annotationsController.index);
routes.get('/annotations/:id', verifyToken, annotationsController.show);
routes.post('/annotations', verifyToken, annotationsController.create);
routes.put('/annotations/:id', verifyToken, annotationsController.update);
routes.delete('/annotations/:id', verifyToken, annotationsController.remove);

export default routes;