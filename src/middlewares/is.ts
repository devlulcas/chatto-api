import { Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../exceptions/http-error';
import { UserRepository } from '../repositories/user.repository';

export function is(roles: Role[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.payload) throw new HttpError(401, 'Permissão ausente');

    const user = req.payload.sub;

    if (!user) throw new HttpError(401, 'Permissão ausente');

    const userRepository = new UserRepository();

    const userRole = await userRepository.getRole(user);

    if (!userRole) {
      throw new HttpError(401, 'Permissão insuficiente');
    }

    const isAllowed = roles.includes(userRole);

    if (!isAllowed) {
      throw new HttpError(401, 'Permissão insuficiente');
    }

    next();
  };
}
