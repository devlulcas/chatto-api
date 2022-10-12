import { Payload } from "../types/payload";

export interface AuthResultDto {
  token: string;
  payload: Payload;
}

export interface SignInDto {
  password: string;
  email: string;
}

export interface SignUpDto {
  name: string;
  password: string;
  email: string;
}
