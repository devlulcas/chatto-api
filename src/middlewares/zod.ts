import { NextFunction, Request, Response } from "express";
import { RequestValidation } from "../types/request-validation";

export function zValidate(schema: RequestValidation) {
  return async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    return next();
  };
}
