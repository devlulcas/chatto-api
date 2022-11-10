import { Topic } from "@prisma/client";

export type TopicDto = Omit<Topic, "id">;
