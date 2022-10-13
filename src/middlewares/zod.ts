import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpError } from "../exceptions/http-error";
import { RequestValidation } from "../types/request-validation";

export function zValidate(schema: RequestValidation) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        throw new HttpError(400, JSON.parse(error.message));
      }

      throw new HttpError(400, "Dados inválidos");
    }

    return next();
  };
}
