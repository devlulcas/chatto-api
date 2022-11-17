import { Request, Response } from "express";
import { TopicDto } from "../dtos/topic.dto";
import { HttpError } from "../exceptions/http-error";
import { ITopicService } from "../services/topic.service";
import { topicSchema } from "../validators";

export class TopicController {
  constructor(private topicService: ITopicService) {}

  async findOne(req: Request, res: Response) {
    const id = parseInt(req.params.id.toString(), 10);

    if (!id) throw HttpError.badRequest();

    const rail = await this.topicService.getTopicById(id);

    res.send(rail);
  }

  async create(req: Request, res: Response) {
    const rail = req.query.rail;

    if (!rail) throw HttpError.badRequest();

    if (typeof rail !== "string") throw HttpError.badRequest();

    const topic: TopicDto = topicSchema.parse({
      railId: parseInt(rail, 10),
      description: req.body.description,
      thumbnail: req.body.thumbnail,
      title: req.body.title,
      userId: req.payload.id,
    });

    const newTopic = await this.topicService.createTopic(topic);

    res.sendStatus(201).send(newTopic);
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id.toString(), 10);

    if (!id) throw HttpError.badRequest();

    const topic: TopicDto = topicSchema.parse({
      railId: req.body.railId,
      description: req.body.description,
      thumbnail: req.body.thumbnail,
      title: req.body.title,
      userId: req.payload.id,
    });

    const updatedTopic = await this.topicService.updateTopic(id, topic);

    res.send(updatedTopic);
  }

  async remove(req: Request, res: Response) {
    const id = parseInt(req.params.id.toString(), 10);

    if (!id) throw HttpError.badRequest();

    const removedTopic = await this.topicService.deleteTopic(id);

    res.send(removedTopic);
  }
}
