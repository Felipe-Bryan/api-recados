import { Request, Response } from 'express';
import { UserRepository } from '../repositories/user.repository';
import { ApiResponse } from '../util/http-response.adapter';
import { Task } from '../models/task.model';
import { TaskRepository } from '../repositories/task.repository';

export class TaskController {
  public async create(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { description, detail } = req.body;

      const task = new Task(detail, description, userId);

      const result = await new TaskRepository().create(task, userId);

      return ApiResponse.created(res, result.toJson(), 'Recado adicionado com sucesso');
    } catch (error) {
      return ApiResponse.serverError(res, error);
    }
  }

  public async listUserTasks(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      let tasks = await new TaskRepository().listUserTasks(userId);

      return ApiResponse.success(
        res,
        tasks.map((task) => task.toJson()),
        'Tasks sucessfully listed'
      );
    } catch (error) {
      return ApiResponse.serverError(res, error);
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const task = await new TaskRepository().getById(id);

      if (!task) {
        return ApiResponse.notFound(res, 'Task');
      }

      return ApiResponse.success(res, task.toJson(), 'Recado encontrado');
    } catch (error) {
      return ApiResponse.serverError(res, error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { detail, description } = req.body;

      const task = await new TaskRepository().getById(id);

      if (!task) {
        return ApiResponse.notFound(res, 'Task');
      }

      if (detail) {
        task.detail = detail;
      }

      if (description) {
        task.description = description;
      }

      await new TaskRepository().update(task);

      return ApiResponse.success(res, task.toJson(), 'Recado atualizado com sucesso!');
    } catch (error) {
      return ApiResponse.serverError(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleted = await new TaskRepository().delete(id);

      if (deleted == 0) {
        return ApiResponse.notFound(res, 'Recado');
      }

      return ApiResponse.success(res, '', 'Recado deletado!');
    } catch (error) {
      return ApiResponse.serverError(res, error);
    }
  }
}
