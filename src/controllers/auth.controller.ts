import { CookieOptions, Request, Response } from 'express';
import { HttpError } from '../exceptions/http-error';
import { AuthService } from '../services/auth.service';
import { signInSchema, signUpSchema } from '../validators';

export class AuthController {
  private cookieOptions: CookieOptions = {
    domain: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 1000,
  };

  private payloadCookieOptions: CookieOptions = {
    maxAge: 60 * 1000,
  };

  constructor(private authService: AuthService) {}

  async signIn(req: Request, res: Response) {
    const signInBodyResult = signInSchema.safeParse(req.body);

    if (!signInBodyResult.success) {
      throw HttpError.badRequest({
        message: 'Corpo da requisição inválido',
        fieldErrors: signInBodyResult.error.flatten().fieldErrors,
      });
    }

    const { token, payload } = await this.authService.signIn({
      email: signInBodyResult.data.email,
      password: signInBodyResult.data.password,
    });

    res.cookie('token', token, this.cookieOptions);

    res.cookie('payload', payload, this.payloadCookieOptions);

    res.send({
      payload,
    });
  }

  async signUp(req: Request, res: Response) {
    const signUpBodyResult = signUpSchema.safeParse(req.body);

    if (!signUpBodyResult.success) {
      throw HttpError.badRequest({
        message: 'Corpo da requisição inválido',
        fieldErrors: signUpBodyResult.error.flatten().fieldErrors,
      });
    }

    const { token, payload } = await this.authService.signUp({
      name: signUpBodyResult.data.name,
      email: signUpBodyResult.data.email,
      password: signUpBodyResult.data.password,
    });

    res.cookie('token', token, this.cookieOptions);

    res.cookie('payload', payload, this.payloadCookieOptions);

    res.status(201).send({
      payload,
    });
  }

  async signOut(_: Request, res: Response) {
    res.cookie('token', '', {
      ...this.cookieOptions,
      maxAge: 1,
    });

    res.send({});
  }
}
