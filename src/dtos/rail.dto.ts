import { Rail } from "@prisma/client";

export interface RailDto extends Omit<Rail, "id"> {}
