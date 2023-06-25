import { Response } from 'express';

export class ApiResponse {
  public static success(res: Response, data: any, msg: string) {
    return res.status(200).send({
      ok: true,
      msg,
      data,
    });
  }

  public static created(res: Response, data: any, msg: string) {
    return res.status(201).send({
      ok: true,
      msg,
      data,
    });
  }

  public static notFound(res: Response, entity: string) {
    return res.status(404).send({
      ok: false,
      msg: `${entity} was not found`,
    });
  }

  public static serverError(res: Response, error: any) {
    return res.status(500).send({
      ok: false,
      msg: error.toString(),
    });
  }

  public static notProvided(res: Response, field: string) {
    return res.status(400).send({
      ok: false,
      msg: `${field} was not provided`,
    });
  }

  public static invalidField(res: Response, field: string) {
    return res.status(400).send({
      ok: false,
      msg: `${field} is invalid`,
    });
  }

  public static badRequest(res: Response, msg: string) {
    return res.status(400).send({
      ok: false,
      msg,
    });
  }

  public static invalidCredentials(res: Response) {
    return res.status(401).send({
      ok: false,
      msg: 'Acesso não autorizado!',
    });
  }

  public static invalidCredentials2(res: Response) {
    return res.status(401).send({
      ok: false,
      msg: 'Senha!',
    });
  }
}
