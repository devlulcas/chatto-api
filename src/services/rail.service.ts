import { prisma } from "../configs";
import { RailDto } from "../dtos/rail.dto";

export class RailService {
  // Busca os detalhes de uma trilha e informações básicas de seus tópicos
  async findOneWithTopics(id: number) {
    return prisma.rail.findFirst({
      where: { id },
      include: {
        topic: {
          select: {
            id: true,
            title: true,
            description: true,
            contents: {
              select: {
                format: true,
              },
            },
          },
        },
      },
    });
  }

  async findMany() {
    return prisma.rail.findMany();
  }

  async create(data: RailDto) {
    const { authorId, ...rest } = data;

    return prisma.rail.create({
      data: {
        ...rest,
        userId: authorId,
      },
    });
  }

  async deleteOne(id: number) {
    return prisma.rail.delete({ where: { id } });
  }
}
