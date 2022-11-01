import { NextFunction, Request, Response } from "express";
import { HttpError } from "../exceptions/http-error";
import { UserService } from "../services/user.service";

export function is(roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.payload.id;

    if (!user) throw new HttpError(401, "Permissão ausente");

    const userService = new UserService();

    const userRole = await userService.getRole(user);

    if (!userRole) {
      throw new HttpError(401, "Permissão insuficiente");
    }

    if (!roles.includes(userRole.toLowerCase().trim())) {
      throw new HttpError(401, "Permissão insuficiente");
    }

    next();
  };
}
