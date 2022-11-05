import { Topic } from "@prisma/client";

export interface TopicDto extends Omit<Topic, "id"> {}
