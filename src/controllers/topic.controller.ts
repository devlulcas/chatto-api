import { Request, Response } from "express";
import { TopicDto } from "../dtos/topic.dto";
import { HttpError } from "../exceptions/http-error";
import { TopicRepository } from "../repositories/topic.repository";

class TopicController {
  constructor(private topicRepository: TopicRepository) {}

  async findOne(req: Request, res: Response) {
    const id = parseInt(req.params.id.toString(), 10);

    if (!id) throw HttpError.badRequest();

    const rail = await this.topicRepository.getOne(id);

    res.send(rail);
  }

  async create(req: Request, res: Response) {
    const railId = req.query.rail;

    if (!railId) throw HttpError.badRequest();

    const authorId = req.payload.id;

    const topic: TopicDto = {
      railId: parseInt(railId?.toString(), 10),
      description: req.body.description,
      thumbnail: req.body.thumbnail,
      title: req.body.title,
      userId: authorId,
    };

    const newTopic = await this.topicRepository.create(topic);

    res.sendStatus(201).send(newTopic);
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id.toString(), 10);

    if (!id) throw HttpError.badRequest();

    const userId = req.payload.id;

    const updatedTopic = await this.topicRepository.update({
      id,
      railId: req.body.railId,
      description: req.body.description,
      title: req.body.title,
      thumbnail: req.body.thumbnail,
      userId,
    });

    res.send(updatedTopic);
  }

  async remove(req: Request, res: Response) {
    const id = parseInt(req.params.id.toString(), 10);

    if (!id) throw HttpError.badRequest();

    const removedTopic = await this.topicRepository.delete(id);

    res.send(removedTopic);
  }
}

export default new TopicController(new TopicRepository());
