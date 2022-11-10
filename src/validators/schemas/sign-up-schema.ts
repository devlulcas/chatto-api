import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string({
    required_error: "O campo nome é obrigatório",
  }),
  email: z
    .string({
      required_error: "O campo e-mail é obrigatório",
    })
    .email("E-mail inválido"),
  password: z
    .string({ required_error: "O campo senha é obrigatório" })
    .min(8, { message: "Senhas devem ser maiores que 8 caracteres" }),
});
