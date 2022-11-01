import { Prisma } from "@prisma/client";

export interface Pagination {
  page: number;
  limit: number;
  cursor?: Prisma.RailWhereUniqueInput;
}
