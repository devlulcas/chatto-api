import { Rail, Topic } from "@prisma/client";
import { prisma } from "../configs";
import { RailDto } from "../dtos/rail.dto";
import { HttpError } from "../exceptions/http-error";
import { Pagination } from "../types/pagination";

interface IRailService {
  findMany(pagination?: { page: number; limit: number }): Promise<Rail[]>;
  findMostPopular(): Promise<Rail[]>;
  searchByTitle(title: string): Promise<Rail[]>;
  getOne(id: Rail["id"]): Promise<{ rail: Rail; topics: Topic[] }>;
  create(rail: RailDto): Promise<Rail>;
  update(rail: Rail): Promise<Rail>;
  delete(railId: Rail["id"]): Promise<Rail>;
}

export class RailService implements IRailService {
  async deleteOne(id: number) {
    return prisma.rail.delete({ where: { id } });
  }

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

  async findMostPopular() {
    return prisma.rail.findMany({
      take: 4,
    });
  }

  async searchByTitle(title: string, pagination?: Pagination) {
    if (!title) throw HttpError.badRequest();

    let rails: Rail[] = [];

    if (pagination) {
      rails = await prisma.rail.findMany({
        where: {
          title: {
            contains: title,
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

    if (!rails.length) throw HttpError.notFound("Nenhuma trilha encontrada");

    return rails;
  }

  async getOne(id: Rail["id"]) {
    const result = await prisma.rail.findFirst({
      where: { id },
      include: { topic: true },
    });

    if (!result) throw HttpError.notFound();

    const { topic, ...rest } = result;

    return {
      rail: rest,
      topics: topic,
    };
  }

  async create(rail: RailDto) {
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
