import { NextFunction, Request, Response } from "express";
import { HttpError } from "../exceptions/http-error";
import { UserRepository } from "../repositories/user.repository";

export function is(roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.payload.id;

    if (!user) throw new HttpError(401, "Permissão ausente");

    const userRepository = new UserRepository();

    const userRole = await userRepository.getRole(user);

    if (!userRole) {
      throw new HttpError(401, "Permissão insuficiente");
    }

    if (!roles.includes(userRole.toLowerCase().trim())) {
      throw new HttpError(401, "Permissão insuficiente");
    }

    next();
  };
}
