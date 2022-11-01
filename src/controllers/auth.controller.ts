import { CookieOptions, Request, Response } from "express";
import { UserService } from "../services/user.service";

class AuthController {
  private cookieOptions: CookieOptions = {
    domain: "/",
    httpOnly: true,
    secure: true,
    maxAge: 60 * 1000,
  };

  private payloadCookieOptions: CookieOptions = {
    maxAge: 60 * 1000,
  };

  constructor(private userService: UserService) {}

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    const { token, payload } = await this.userService.signIn({
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
    const { name, email, password } = req.body;

    const { token, payload } = await this.userService.signUp({
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

export default new AuthController(new UserService());
