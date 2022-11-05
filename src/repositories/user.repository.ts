import { prisma } from "../configs";
import { AuthResultDto, SignInDto, SignUpDto } from "../dtos/auth.dto";
import { HttpError } from "../exceptions/http-error";
import { Payload } from "../types/payload";
import { JWTRepository } from "./jwt.repository";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

interface IUserRepository {
  signIn(data: SignInDto): Promise<AuthResultDto>;
  signUp(data: SignUpDto): Promise<AuthResultDto>;
  getRole(id: number): Promise<Role>;
}

export class UserRepository implements IUserRepository {
  constructor(private jwtRepository = new JWTRepository()) {}

  async signIn(data: SignInDto) {
    const user = await prisma.user.findFirst({ where: { email: data.email } });

    if (!user) throw HttpError.notFound("Usuário inexistente");

    const isPasswordCorrect = await this.checkPassword(
      data.password,
      user.password
    );

    if (!isPasswordCorrect) throw HttpError.notFound("Usuário inexistente");

    const payload: Payload = {
      id: user.id,
      name: user.name,
      role: user.role,
      permissions: [],
    };

    const token = this.jwtRepository.createToken(payload);

    return {
      token,
      payload,
    };
  }

  async signUp(data: SignUpDto) {
    const user = await prisma.user.findFirst({ where: { email: data.email } });

    if (user) throw HttpError.notFound("Erro ao realizar cadastro");

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

    const token = this.jwtRepository.createToken(payload);

    return {
      token,
      payload,
    };
  }

  async getRole(id: number) {
    const user = await prisma.user.findFirst({ where: { id } });

    if (!user?.role) throw HttpError.notFound();

    return user?.role;
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 8);
  }

  private async checkPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
