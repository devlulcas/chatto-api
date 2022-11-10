import { z } from "zod";

export const urlContentSchema = z.object({
  url: z.string({
    required_error: "O campo URL é obrigatório",
  }),
  description: z.string({
    required_error: "O campo descrição é obrigatório",
  }),
  title: z.string({
    required_error: "O campo título é obrigatório",
  }),
});
