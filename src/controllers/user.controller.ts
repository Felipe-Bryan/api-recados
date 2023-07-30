import { User } from '../models/user.model';
import { Request, Response } from 'express';
import { ApiResponse } from '../util/http-response.adapter';
import { UserRepository } from '../repositories/user.repository';
import { TaskRepository } from '../repositories/task.repository';

export class UserController {
  public async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const user = new User(name, email, password);
      const result = await new UserRepository().create(user);

      return ApiResponse.success(res, result.toJson(), 'User sucessfully created!');
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public async list(req: Request, res: Response) {
    try {
      const result = await new UserRepository().list();

      return ApiResponse.success(
        res,
        result.map((user) => user.toList()),
        'Users successfully listed'
      );
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await new UserRepository().get(id);

      if (!result) {
        return ApiResponse.notFound(res, 'User');
      }

      result.tasks = await new TaskRepository().listUserTasks(id);

      return ApiResponse.success(res, result.toJson(), 'User successfully obtained');
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return ApiResponse.notProvided(res, 'E-mail');
      }

      if (!password) {
        return ApiResponse.notProvided(res, 'Password');
      }

      const user = await new UserRepository().getByEmail(email);

      if (!user) {
        return ApiResponse.invalidCredentials(res);
      }

      if (user.password !== password) {
        return ApiResponse.invalidCredentials(res);
      }

      return ApiResponse.success(
        res,
        {
          id: user.id,
          name: user.name,
        },
        'Login successfully done'
      );
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, password, email } = req.body;

      const user = await new UserRepository().get(id);

      if (!user) {
        return ApiResponse.notFound(res, 'User');
      }

      if (name) {
        user.name = name;
      }

      if (password) {
        user.password = password;
      }

      if (email) {
        user.email = email;
      }

      await new UserRepository().update(user);

      return ApiResponse.success(res, user.toJson(), 'User updated!');
    } catch (error) {
      return ApiResponse.serverError(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleted = await new UserRepository().delete(id);

      if (deleted == 0) {
        return ApiResponse.notFound(res, 'User');
      }

      return ApiResponse.success(res, '', 'Usuário deletado!');
    } catch (error) {
      return ApiResponse.serverError(res, error);
    }
  }
}
