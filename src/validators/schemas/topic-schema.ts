import { z } from "zod";

export const topicSchema = z.object({
  title: z
    .string()
    .min(3, { message: "O título deve ter no mínimo 3 caracteres" }),
  description: z
    .string()
    .min(3, { message: "A descrição deve ter no mínimo 3 caracteres" }),
  thumbnail: z.string().url({ message: "O thumbnail deve ser uma URL válida" }),
  railId: z
    .number()
    .int({ message: "O id da trilha deve ser um número inteiro" }),
  userId: z
    .number()
    .int({ message: "O id do usuário deve ser um número inteiro" }),
});
