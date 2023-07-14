import { Role, User } from "@prisma/client";
import { prisma } from "../configs";
import { NewUserDto } from "../dtos/user.dto";
import { HttpError } from "../exceptions/http-error";

export type IUserRepository = {
  findByEmail(email: string): Promise<User | null>;
  save(data: NewUserDto): Promise<User>;
  findById(id: User["id"]): Promise<User | null>;
  getRole(id: number): Promise<Role>;
}

export class UserRepository implements IUserRepository {
  async findByEmail(email: string) {
    return prisma.user.findFirst({ where: { email } });
  }

  async save(data: NewUserDto) {
    return prisma.user.create({ data: data });
  }

  async findById(id: User["id"]) {
    return prisma.user.findFirst({ where: { id } });
  }

  async getRole(id: number) {
    const user = await prisma.user.findFirst({ where: { id } });

    if (!user?.role) throw HttpError.notFound();

    return user?.role;
  }
}
