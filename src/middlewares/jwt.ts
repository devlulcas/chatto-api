import { NextFunction, Request, Response } from "express";
import { HttpError } from "../exceptions/http-error";
import { JWTService } from "../services/jwt.service";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.token;

    if (!token) throw new HttpError(401, "Token ausente");

    const auth = new JWTService();

    const decoded = await auth.validateToken(token);

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
