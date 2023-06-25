import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../util/http-response.adapter';
import { users } from '../database/usersDB';

export class UserMiddleware {
  public static validateCreateFields(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, confirmPassword } = req.body;

      if (!name) {
        return ApiResponse.notProvided(res, 'Name');
      }

      if (!email) {
        return ApiResponse.notProvided(res, 'Email');
      }

      if (!password) {
        return ApiResponse.notProvided(res, 'Password');
      }

      if (password.length < 5) {
        return ApiResponse.badRequest(res, 'Password should be at least 5 characters');
      }

      if (password !== confirmPassword) {
        return ApiResponse.badRequest(res, 'Passwords do not match');
      }

      next();
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }

  public static validateEmailAlreadyExists(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const userEmail = users.some((user) => user.email === email);

      if (userEmail) {
        return ApiResponse.badRequest(res, 'Email already exists');
      }

      next();
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }
}
