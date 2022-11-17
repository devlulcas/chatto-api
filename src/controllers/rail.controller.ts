import { Request, Response } from "express";
import { HttpError } from "../exceptions/http-error";
import { IRailService } from "../services/rail.service";
import { Pagination } from "../types/pagination";
import { railSchema } from "../validators";

export class RailController {
  constructor(private railService: IRailService) {}

  async create(req: Request, res: Response) {
    const rail = railSchema.parse({
      ...req.body,
      userId: req.payload.id,
    });

    const newRail = await this.railService.createRail({ ...rail }, rail.userId);

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
      const rails = await this.railService.getRailsByTitle(search, pagination);
      res.send(rails);
    }

    const rails = await this.railService.getRails(pagination);

    res.send(rails);
  }

  async findMostPopular(req: Request, res: Response) {
    const rails = await this.railService.getMostPopularRails();

    res.send(rails);
  }

  async findOne(req: Request, res: Response) {
    const id = parseInt(req.params.id.toString(), 10);

    if (!id) throw HttpError.badRequest();

    const rail = await this.railService.getRailDetails(id);

    res.send(rail);
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id.toString(), 10);

    if (!id) throw HttpError.badRequest();

    const rail = railSchema.parse({
      ...req.body,
      userId: req.payload.id,
    });

    const updatedRail = await this.railService.updateRail({
      id,
      ...rail,
    });

    res.send(updatedRail);
  }

  async remove(req: Request, res: Response) {
    const id = parseInt(req.params.id.toString(), 10);

    if (!id) throw HttpError.badRequest();

    const removedRail = await this.railService.deleteRail(id);

    res.send(removedRail);
  }
}
