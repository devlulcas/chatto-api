import { Rail, Topic } from "@prisma/client";
import { prisma } from "../configs";
import { RailDto } from "../dtos/rail.dto";
import { UserDto } from "../dtos/user.dto";
import { Pagination } from "../types/pagination";

export interface IRailRepository {
  findMany(pagination?: { page: number; limit: number }): Promise<Rail[]>;
  findByTitle(title: string, pagination?: Pagination): Promise<Rail[]>;
  findById(
    id: Rail["id"]
  ): Promise<{ rail: Rail; topics: Topic[]; author: UserDto } | null>;
  save(rail: RailDto): Promise<Rail>;
  update(rail: Rail): Promise<Rail>;
  delete(railId: Rail["id"]): Promise<Rail>;
}

export class RailRepository implements IRailRepository {
  async findMany(pagination?: Pagination): Promise<Rail[]> {
    if (pagination) {
      return prisma.rail.findMany({
        take: pagination.limit,
        skip: pagination.page * pagination.limit,
        cursor: pagination.cursor,
      });
    }

    return prisma.rail.findMany();
  }

  async findByTitle(title: string, pagination?: Pagination) {
    let rails: Rail[] = [];

    if (pagination) {
      rails = await prisma.rail.findMany({
        where: {
          title: {
            contains: title,
            mode: "insensitive",
          },
        },
        take: pagination.limit,
        skip: pagination.page * pagination.limit,
        cursor: pagination.cursor,
      });
    }

    rails = await prisma.rail.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
    });

    return rails;
  }

  async findById(id: Rail["id"]) {
    const result = await prisma.rail.findFirst({
      where: { id },
      include: { topic: true, author: true },
    });

    if (!result) return null;

    const { topic, author, ...rest } = result;

    return {
      rail: rest,
      topics: topic,
      author: {
        id: author.id,
        name: author.name,
        email: author.email,
        role: author.role,
      },
    };
  }

  async save(rail: RailDto) {
    return prisma.rail.create({
      data: rail,
    });
  }

  async update(rail: Rail) {
    return prisma.rail.update({
      where: { id: rail.id },
      data: rail,
    });
  }

  async delete(railId: Rail["id"]) {
    return prisma.rail.delete({
      where: { id: railId },
    });
  }
}
