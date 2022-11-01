import { Request, Response } from "express";
import { RailDto } from "../dtos/rail.dto";
import { HttpError } from "../exceptions/http-error";
import { RailService } from "../services/rail.service";
import { Pagination } from "../types/pagination";

class RailController {
  constructor(private railService: RailService) {}

  async create(req: Request, res: Response) {
    const authorId = req.payload.id;

    const rail: RailDto = {
      description: req.body.description,
      thumbnail: req.body.thumbnail,
      title: req.body.title,
      userId: authorId,
    };

    const newRail = await this.railService.create(rail);

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
      const rails = await this.railService.searchByTitle(search, pagination);
      res.send(rails);
    }

    const rails = await this.railService.findMany(pagination);

    res.send(rails);
  }

  async findOne(req: Request, res: Response) {
    const id = parseInt(req.params.id.toString(), 10);

    if (!id) throw HttpError.badRequest();

    const rail = await this.railService.getOne(id);

    res.send(rail);
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id.toString(), 10);

    if (!id) throw HttpError.badRequest();

    const userId = req.payload.id;

    const updatedRail = await this.railService.update({
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

    const removedRail = await this.railService.delete(id);

    res.send(removedRail);
  }
}

export default new RailController(new RailService());
