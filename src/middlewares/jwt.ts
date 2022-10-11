import { NextFunction, Request, Response } from "express";
import { HttpError } from "../exceptions/http-error";
import { Auth } from "../services/auth";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authToken = req.cookies.token ?? req.headers.authorization;

    if (!authToken) throw new HttpError(401, "Token ausente");

    const [, token] = authToken.split(" ");

    if (!token) throw new HttpError(401, "Token ausente");

    const auth = new Auth();

    const decoded = await auth.validadeToken(token);

    req.payload = decoded;

    next();
  } catch (unknownError) {
    const error = unknownError as Error;

    if (error.name === "TokenExpiredError") {
      throw new HttpError(401, "Token expirado");
    }

    throw new HttpError(401, "Token inválido");
  }
}
