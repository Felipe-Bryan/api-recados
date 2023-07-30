import { Request, Response, Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { TaskMiddleware } from '../middlewares/task.middleware';
import { UserMiddleware } from '../middlewares/user.middleware';

export const taskRoutes = () => {
  const app = Router({
    mergeParams: true,
  });

  app.post(
    '/',
    [TaskMiddleware.validateFieldsCreate, TaskMiddleware.validateLengthFields],
    new TaskController().create
  );
  app.get('/', [UserMiddleware.validateUser], new TaskController().listUserTasks);
  app.get('/:id', [UserMiddleware.validateUser], new TaskController().getById);
  app.put('/:id', [UserMiddleware.validateUser], new TaskController().update);
  app.delete('/:id', [UserMiddleware.validateUser], new TaskController().delete);

  return app;
};
