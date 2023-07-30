import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserMiddleware } from '../middlewares/user.middleware';
import { taskRoutes } from './task.routes';

export const userRoutes = () => {
  const app = Router();

  // Users
  app.get('/', new UserController().list);
  app.get('/:id', new UserController().get);
  app.post(
    '/',
    [UserMiddleware.validateCreateFields, UserMiddleware.validateEmailAlreadyExists],
    new UserController().create
  );
  app.post('/login', new UserController().login);
  app.put('/:id', new UserController().update);
  app.delete('/:id', new UserController().delete);

  // Tasks
  app.use('/:userId/tasks', taskRoutes());

  return app;
};
