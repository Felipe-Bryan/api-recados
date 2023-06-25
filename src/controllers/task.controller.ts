import { Request, Response } from 'express';
import { UserRepository } from '../repositories/user.repository';
import { ApiResponse } from '../util/http-response.adapter';
import { Task } from '../models/task.model';

export class TaskController {
  public create(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { description, detail } = req.body;

      const userIndex = new UserRepository().findIndex(userId);
      if (userIndex < 0) {
        return ApiResponse.notFound(res, 'User');
      }

      const task = new Task(detail, description);
      const addTask = new UserRepository().addTask(userIndex, task);

      return ApiResponse.created(res, addTask, 'Recado adicionado com sucesso');
    } catch (error) {
      return ApiResponse.serverError(res, error);
    }
  }

  public getById(req: Request, res: Response) {
    try {
      const { userId, TaskId } = req.params;

      const userIndex = new UserRepository().findIndex(userId);
      if (userIndex < 0) {
        return ApiResponse.notFound(res, 'User');
      }

      const taskIndex = new UserRepository().findTaskIndex(userId, TaskId);
      if (taskIndex < 0) {
        return ApiResponse.notFound(res, 'Task');
      }

      const task = new UserRepository().getTaskById(userId, TaskId);

      return ApiResponse.success(res, task, 'Recado encontrado com sucesso');
    } catch (error) {
      return ApiResponse.serverError(res, error);
    }
  }

  public list(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const userIndex = new UserRepository().findIndex(userId);

      if (userIndex < 0) {
        return ApiResponse.notFound(res, 'User');
      }

      const tasks = new UserRepository().listTasks(userIndex);

      return ApiResponse.success(res, tasks, 'Recados listados com sucesso');
    } catch (error) {
      return ApiResponse.serverError(res, error);
    }
  }

  public update(req: Request, res: Response) {
    try {
      const { userId, taskId } = req.params;
      const { detail, description } = req.body;

      const userIndex = new UserRepository().findIndex(userId);

      if (userIndex < 0) {
        return ApiResponse.notFound(res, 'User');
      }

      const taskIndex = new UserRepository().findTaskIndex(userId, taskId);

      if (taskIndex < 0) {
        return ApiResponse.notFound(res, 'Task');
      }

      const task = new UserRepository().updateTask(userId, taskId, detail, description);

      return ApiResponse.created(res, task, 'Recado editado com sucesso!');
    } catch (error) {
      return ApiResponse.serverError(res, error);
    }
  }

  public delete(req: Request, res: Response) {
    try {
      const { userId, taskId } = req.params;

      const userIndex = new UserRepository().findIndex(userId);

      if (userIndex < 0) {
        return ApiResponse.notFound(res, 'User');
      }

      const taskIndex = new UserRepository().findTaskIndex(userId, taskId);

      if (taskIndex < 0) {
        return ApiResponse.notFound(res, 'Task');
      }

      const task = new UserRepository().deleteTask(userId, taskId);

      return ApiResponse.success(res, task, 'Recado deletado com sucesso');
    } catch (error) {
      return ApiResponse.serverError(res, error);
    }
  }
}
