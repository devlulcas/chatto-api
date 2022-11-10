import { z } from "zod";

export const railSchema = z.object({
  title: z.string(),
  description: z.string(),
  thumbnail: z.string().url(),
  userId: z.number().int(),
});
