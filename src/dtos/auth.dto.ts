import { JWTPayload } from '../types/payload';

export type AuthResultDto = {
  token: string;
  payload: JWTPayload;
};

export type SignInDto = {
  password: string;
  email: string;
};

export type SignUpDto = {
  name: string;
  password: string;
  email: string;
};
