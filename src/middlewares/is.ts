import { NextFunction, Request, Response } from "express";
import { HttpError } from "../exceptions/http-error";

export function is(roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.payload.role;

    if (!userRole) throw new HttpError(401, "Permissão ausente");

    if (!roles.includes(userRole)) {
      throw new HttpError(401, "Permissão insuficiente");
    }

    next();
  };
}
