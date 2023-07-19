import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { HttpError, HttpErrorData } from '../exceptions/http-error';

type ErrorResponse = {
  error: HttpErrorData;
};

export function errorHandler(error: unknown, req: Request, res: Response, next: NextFunction) {
  let content: ErrorResponse = {
    error: {
      message: 'Internal Server Error',
      fieldErrors: null,
    },
  };

  if (error instanceof HttpError) {
    content = {
      error: {
        message: error.message,
        fieldErrors: error.fieldErrors,
      },
    };
  }

  if (error instanceof ZodError) {
    content = {
      error: {
        message: 'Requisição criada incorretamente',
        fieldErrors: error.flatten().fieldErrors,
      },
    };
  }

  if (error instanceof Error) {
    content = {
      error: {
        message: error.message,
        fieldErrors: null,
      },
    };
  }

  const code = error instanceof HttpError ? error.code : 500;

  if (code === 500) {
    console.error(error);
  }

  res.status(code).send(content);
}
