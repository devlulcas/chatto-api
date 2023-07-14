import { Env } from "./configs/env";
import { JWTPayload } from "./types/payload";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
  
  namespace Express {
    interface Request {
      payload: JWTPayload | null;
    }
  }
}

export {};
