import { Content, Topic } from "@prisma/client";
import { TopicDto } from "../dtos/topic.dto";
import { HttpError } from "../exceptions/http-error";
import { IRailRepository } from "../repositories/rail.repository";
import { ITopicRepository } from "../repositories/topic.repository";

export interface ITopicService {
  getTopicById(topicId: number): Promise<{ topic: Topic; contents: Content[] }>;
  createTopic(topic: TopicDto): Promise<Topic>;
  updateTopic(topicId: number, topic: TopicDto): Promise<Topic>;
  deleteTopic(topicId: number): Promise<Topic>;
}

export class TopicService implements ITopicService {
  constructor(
    private readonly topicRepository: ITopicRepository,
    private readonly railRepository: IRailRepository
  ) {}

  async getTopicById(topicId: number) {
    const result = await this.topicRepository.getOne(topicId);

    if (!result) throw new HttpError(404, "Topic not found");

    return result;
  }

  async createTopic(topic: TopicDto) {
    const rail = await this.railRepository.findById(topic.railId);

    if (!rail) throw new HttpError(404, "Rail not found");

    return this.topicRepository.save(topic);
  }

  async updateTopic(topicId: number, topic: TopicDto) {
    const result = await this.topicRepository.getOne(topicId);

    if (!result) throw new HttpError(404, "Topic not found");

    return this.topicRepository.update({ ...result.topic, ...topic });
  }

  async deleteTopic(topicId: number) {
    const result = await this.topicRepository.getOne(topicId);

    if (!result) throw new HttpError(404, "Topic not found");

    return this.topicRepository.delete(topicId);
  }
}
