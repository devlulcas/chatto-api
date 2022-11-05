import { Content, Topic } from "@prisma/client";
import { prisma } from "../configs";
import { TopicDto } from "../dtos/topic.dto";
import { HttpError } from "../exceptions/http-error";

interface ITopicRepository {
  getOne(id: Topic["id"]): Promise<{ topic: Topic; contents: Content[] }>;
  create(topic: TopicDto): Promise<Topic>;
  update(topic: Topic): Promise<Topic>;
  delete(topicId: Topic["id"]): Promise<Topic>;
}

export class TopicRepository implements ITopicRepository {
  async getOne(id: Topic["id"]) {
    const result = await prisma.topic.findFirst({
      where: { id },
      include: { contents: true },
    });

    if (!result) throw HttpError.notFound();

    const { contents, ...rest } = result;

    return {
      topic: rest,
      contents: contents,
    };
  }

  async create(topic: TopicDto) {
    return prisma.topic.create({
      data: topic,
    });
  }

  async update(topic: Topic) {
    return prisma.topic.update({
      where: { id: topic.id },
      data: topic,
    });
  }

  async delete(topicId: Topic["id"]) {
    return prisma.topic.delete({
      where: { id: topicId },
    });
  }
}
