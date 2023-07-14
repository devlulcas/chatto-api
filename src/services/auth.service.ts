import { AuthResultDto, SignInDto, SignUpDto } from "../dtos/auth.dto";
import { HttpError } from "../exceptions/http-error";
import { ICrypto } from "../lib/crypto.lib";
import { ITokenGenerator } from "../lib/jwt";
import { IUserRepository } from "../repositories/user.repository";
import { JWTPayload } from "../types/payload";

export type IAuthService = {
  signIn(data: SignInDto): Promise<AuthResultDto>;
  signUp(data: SignUpDto): Promise<AuthResultDto>;
  signOut(): Promise<void>;
}

export class AuthService implements IAuthService {
  constructor(
    private userRepository: IUserRepository,
    private crypto: ICrypto,
    private tokenGenerator: ITokenGenerator
  ) {}

  async signIn(data: SignInDto): Promise<AuthResultDto> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) throw HttpError.notFound({ message: "Usuário inexistente" });

    const isPasswordCorrect = await this.crypto.checkPassword(
      data.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw HttpError.notFound({ message: "Usuário inexistente" });
    }

    const payload: JWTPayload = {
      sub: user.id,
      name: user.name,
      role: user.role,
    };

    const token = await this.tokenGenerator.createToken(payload);

    return {
      token,
      payload,
    };
  }

  async signUp(data: SignUpDto): Promise<AuthResultDto> {
    const user = await this.userRepository.findByEmail(data.email);

    if (user) throw HttpError.notFound({ message: "Usuário já existe" });

    const hashedPassword = await this.crypto.hashPassword(data.password);

    const newUser = await this.userRepository.save({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    const payload: JWTPayload = {
      sub: newUser.id,
      name: newUser.name,
      role: newUser.role,
    };

    const token = await this.tokenGenerator.createToken(payload);

    return {
      token,
      payload,
    };
  }

  async signOut(): Promise<void> {
    return;
  }
}
