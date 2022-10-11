import { NextFunction, Request, Response } from "express";
import { ZodAny, ZodObject } from "zod";

type RequestValidation = ZodObject<{
  body?: ZodAny;
  query?: ZodAny;
  params?: ZodAny;
}>;

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
