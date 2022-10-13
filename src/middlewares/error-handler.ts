import { NextFunction, Request, Response } from "express";
import { HttpError } from "../exceptions/http-error";

export function errorHandler(
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const code = error.code || 500;
  const content = error.message ?? "Ocorreu um erro";

  res.status(code).send({
    status: code,
    error: content,
  });
}
