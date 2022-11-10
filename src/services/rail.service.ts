import { Rail, Topic } from "@prisma/client";
import { RailDto } from "../dtos/rail.dto";
import { UserDto } from "../dtos/user.dto";
import { HttpError } from "../exceptions/http-error";
import { IRailRepository } from "../repositories/rail.repository";
import { Pagination } from "../types/pagination";

export interface IRailService {
  createRail(data: Omit<RailDto, "userId">, authorId: number): Promise<Rail>;
  getRailDetails(
    id: Rail["id"]
  ): Promise<{ rail: Rail; topics: Topic[]; author: UserDto }>;
  getRails(pagination?: Pagination): Promise<Rail[]>;
  getRailsByTitle(title: string, pagination?: Pagination): Promise<Rail[]>;
  getMostPopularRails(): Promise<Rail[]>;
  updateRail(data: Rail): Promise<Rail>;
  deleteRail(id: Rail["id"]): Promise<Rail>;
}

export class RailService implements IRailService {
  constructor(private readonly railRepository: IRailRepository) {}

  async createRail(data: Omit<RailDto, "userId">, authorId: number) {
    try {
      const newRail = await this.railRepository.save({
        ...data,
        userId: authorId,
      });

      return newRail;
    } catch (error) {
      throw HttpError.badRequest("Erro ao criar trilho");
    }
  }

  async getRails(pagination?: Pagination) {
    const rails = await this.railRepository.findMany(pagination);

    if (!rails.length) throw HttpError.notFound("Nenhuma trilha encontrada");

    return rails;
  }

  async getRailsByTitle(title: string, pagination?: Pagination) {
    if (!title) throw HttpError.badRequest();

    const rails = await this.railRepository.findByTitle(title, pagination);

    if (!rails.length) throw HttpError.notFound("Nenhuma trilha encontrada");

    return rails;
  }

  async getRailDetails(id: Rail["id"]) {
    const details = await this.railRepository.findById(id);

    if (!details) throw HttpError.notFound("Trilho não encontrado");

    return details;
  }

  async getMostRecentRails(pagination?: Pagination) {
    const rails = await this.railRepository.findMany(pagination);

    if (!rails.length) throw HttpError.notFound("Nenhuma trilha encontrada");

    return rails;
  }

  async getMostPopularRails() {
    const rails = await this.railRepository.findMany({
      page: 0,
      limit: 4,
    });

    if (!rails.length) throw HttpError.notFound("Nenhuma trilha encontrada");

    return rails;
  }

  async updateRail(data: Rail) {
    try {
      const rail = await this.railRepository.update(data);

      if (!rail) throw HttpError.notFound("Trilho não encontrado");

      return rail;
    } catch (error) {
      throw HttpError.notFound("Falha ao atualizar trilho");
    }
  }

  async deleteRail(id: Rail["id"]) {
    try {
      const rail = await this.railRepository.delete(id);

      if (!rail) throw HttpError.notFound("Trilho não encontrado");

      return rail;
    } catch (error) {
      throw HttpError.notFound("Falha ao deletar trilho");
    }
  }
}
