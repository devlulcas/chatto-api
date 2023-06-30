import { Env } from "./configs/env";
import { Payload } from "./types/payload";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
  
  namespace Express {
    interface Request {
      payload: Payload;
    }
  }
}

export {};
