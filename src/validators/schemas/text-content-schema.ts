import { z } from "zod";

export const textContentSchema = z.object({
  content: z.string({
    required_error: "Conteúdo é obrigatório",
  }),
  title: z.string({
    required_error: "O campo título é obrigatório",
  }),
});
