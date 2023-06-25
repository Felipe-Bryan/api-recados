import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserMiddleware } from '../middlewares/user.middleware';
import { TaskController } from '../controllers/task.controller';
import { TaskMiddleware } from '../middlewares/task.middleware';

export const userRoutes = () => {
  const app = Router();

  // Users
  app.get('/', new UserController().list);
  app.post(
    '/',
    [UserMiddleware.validateCreateFields, UserMiddleware.validateEmailAlreadyExists],
    new UserController().create
  );
  app.post('/login', new UserController().login);
  app.put('/:id', new UserController().update);
  app.delete('/:id', new UserController().delete);

  // Tasks
  app.get('/:userId/tasks', new TaskController().list);
  app.get('/:userId/:taskId', new TaskController().getById);
  app.post(
    '/:userId',
    [TaskMiddleware.validateFieldsCreate, TaskMiddleware.validateLengthFields],
    new TaskController().create
  );
  app.put('/:userId/:taskId', new TaskController().update);
  app.delete('/:userId/:taskId', new TaskController().delete);

  return app;
};
