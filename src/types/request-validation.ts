import { AnyZodObject, ZodObject } from "zod";

export type RequestValidation = ZodObject<{
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
}>;
