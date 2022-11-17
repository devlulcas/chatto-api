import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpError } from "../exceptions/http-error";

export function errorHandler(
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const code = error.code >= 400 ? error.code : 500;
  const content = error.message ?? "Ocorreu um erro";

  if (error instanceof ZodError) {
    const errors = error.errors.map((error) => ({
      path: error.path.join("."),
      message: error.message,
    }));

    return res.status(400).json({ errors });
  }

  if (code === 500) {
    console.error(error);
  }

  res.status(code).send({
    status: code,
    error: content,
  });
}
