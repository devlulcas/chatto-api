import { CookieOptions, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { signInSchema, signUpSchema } from "../validators";

export class AuthController {
  private cookieOptions: CookieOptions = {
    domain: "/",
    httpOnly: true,
    secure: true,
    maxAge: 60 * 1000,
  };

  private payloadCookieOptions: CookieOptions = {
    maxAge: 60 * 1000,
  };

  constructor(private authService: AuthService) {}

  async signIn(req: Request, res: Response) {
    const { email, password } = signInSchema.parse({ body: req.body });

    const { token, payload } = await this.authService.signIn({
      email,
      password,
    });

    res.cookie("token", token, this.cookieOptions);

    res.cookie("payload", payload, this.payloadCookieOptions);

    res.send({
      payload,
    });
  }

  async signUp(req: Request, res: Response) {
    const { name, email, password } = signUpSchema.parse({ body: req.body });

    const { token, payload } = await this.authService.signUp({
      name,
      email,
      password,
    });

    res.cookie("token", token, this.cookieOptions);

    res.cookie("payload", payload, this.payloadCookieOptions);

    res.status(201).send({
      payload,
    });
  }

  async signOut(req: Request, res: Response) {
    res.cookie("token", "", {
      ...this.cookieOptions,
      maxAge: 1,
    });

    res.send({});
  }
}
