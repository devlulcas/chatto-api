import { prisma } from "../configs";
import { AuthResultDto, SignInDto, SignUpDto } from "../dtos/auth.dto";
import { HttpError } from "../exceptions/http-error";
import { Payload } from "../types/payload";
import { JWTService } from "./jwt.service";

export class AuthService {
  constructor(private jwtService = new JWTService()) {}

  async signIn(data: SignInDto): Promise<AuthResultDto> {
    const user = await prisma.user.findFirst({ where: { email: data.email } });

    if (!user) throw new HttpError(404, "Usuário inexistente");

    const isPasswordCorrect = await this.checkPassword(
      data.password,
      user.password
    );

    if (!isPasswordCorrect) throw new HttpError(404, "Usuário inexistente");

    const payload: Payload = {
      id: user.id,
      name: user.name,
      role: user.role,
      permissions: [],
    };

    const token = this.jwtService.createToken(payload);

    return {
      token,
      payload,
    };
  }

  async signUp(data: SignUpDto): Promise<AuthResultDto> {
    const user = await prisma.user.findFirst({ where: { email: data.email } });

    if (user) throw new HttpError(404, "Erro ao realizar cadastro");

    const hashedPassword = await this.hashPassword(data.password);

    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    const payload: Payload = {
      id: newUser.id,
      name: newUser.name,
      role: newUser.role,
      permissions: [],
    };

    const token = this.jwtService.createToken(payload);

    return {
      token,
      payload,
    };
  }

  private async hashPassword(password: string) {
    return "";
  }

  private async checkPassword(password: string, hash: string) {
    return false;
  }
}
