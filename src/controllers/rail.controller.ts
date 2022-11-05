import { Request, Response } from "express";
import { RailDto } from "../dtos/rail.dto";
import { HttpError } from "../exceptions/http-error";
import { RailRepository } from "../repositories/rail.repository";
import { Pagination } from "../types/pagination";

class RailController {
  constructor(private railRepository: RailRepository) {}

  async create(req: Request, res: Response) {
    const authorId = req.payload.id;

    const rail: RailDto = {
      description: req.body.description,
      thumbnail: req.body.thumbnail,
      title: req.body.title,
      userId: authorId,
    };

    const newRail = await this.railRepository.create(rail);

    res.sendStatus(201).send(newRail);
  }

  async findAll(req: Request, res: Response) {
    let pagination: Pagination | undefined = undefined;

    if (req.query.page) {
      const limit = req.query.limit?.toString() ?? "10";
      const page = req.query.page.toString() ?? "1";
      const lastResourceId = req.query.cursor
        ? parseInt(req.query.cursor.toString(), 10)
        : undefined;

      pagination = {
        limit: parseInt(limit, 10),
        page: parseInt(page, 10),
        cursor: lastResourceId ? { id: lastResourceId } : undefined,
      };
    }

    if (req.query.search) {
      const search = req.query.search.toString();
      const rails = await this.railRepository.searchByTitle(search, pagination);
      res.send(rails);
    }

    const rails = await this.railRepository.findMany(pagination);

    res.send(rails);
  }

  async findMostPopular(req: Request, res: Response) {
    const rails = await this.railRepository.findMostPopular();

    res.send(rails);
  }

  async findOne(req: Request, res: Response) {
    const id = parseInt(req.params.id.toString(), 10);

    if (!id) throw HttpError.badRequest();

    const rail = await this.railRepository.getOne(id);

    res.send(rail);
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id.toString(), 10);

    if (!id) throw HttpError.badRequest();

    const userId = req.payload.id;

    const updatedRail = await this.railRepository.update({
      id,
      description: req.body.description,
      title: req.body.title,
      thumbnail: req.body.thumbnail,
      userId,
    });

    res.send(updatedRail);
  }

  async remove(req: Request, res: Response) {
    const id = parseInt(req.params.id.toString(), 10);

    if (!id) throw HttpError.badRequest();

    const removedRail = await this.railRepository.delete(id);

    res.send(removedRail);
  }
}

export default new RailController(new RailRepository());
