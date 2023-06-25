import { users } from '../database/usersDB';
import { User } from '../models/user.model';
import { Request, Response } from 'express';
import { ApiResponse } from '../util/http-response.adapter';
import { UserRepository } from '../repositories/user.repository';

export class UserController {
  public create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const user = new User(name, email, password);
      users.push(user);

      return ApiResponse.success(res, user.toJson(), 'Usuário criado com sucesso!');
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const userIndex = new UserRepository().findIndex(id);

      if (userIndex < 0) {
        return ApiResponse.notFound(res, 'User');
      }

      const user = users.splice(userIndex, 1);

      return ApiResponse.success(res, user, 'User deleted');
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const userIndex = new UserRepository().findIndex(id);

      if (userIndex < 0) {
        return ApiResponse.notFound(res, 'User');
      }

      if (name) {
        users[userIndex].name = name;
      }

      if (email) {
        users[userIndex].email = email;
      }

      if (password) {
        users[userIndex].password = password;
      }
    } catch (error) {
      return ApiResponse.serverError(res, error);
    }
  }

  public list(req: Request, res: Response) {
    try {
      let usersList = users.map((user) => user.toJson());

      return ApiResponse.success(res, usersList, 'Users listed');
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return ApiResponse.notProvided(res, 'Email');
      }

      if (!password) {
        return ApiResponse.notProvided(res, 'Password');
      }

      const user = new UserRepository().getByEmail(email);
      if (!user) {
        return ApiResponse.invalidCredentials(res);
      }

      if (user.password !== password) {
        return ApiResponse.invalidCredentials2(res);
      }

      return ApiResponse.success(res, user.toJson(), 'Logado com sucesso');
    } catch (error) {
      return ApiResponse.serverError(res, error);
    }
  }
}
