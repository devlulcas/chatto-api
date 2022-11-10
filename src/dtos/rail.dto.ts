import { Rail } from "@prisma/client";

export type RailDto = Omit<Rail, "id">;
