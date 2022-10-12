import { Router } from "express";
import railController from "../controllers/rail.controller";
import { is } from "../middlewares/is";
import { authMiddleware } from "../middlewares/jwt";

const railRouter = Router();

/**
 * # Lista todas as trilhas
 *
 * > Devolve apenas as informações básicas das trilhas, não seus tópicos.
 */
railRouter.get("/", railController.findAll);

/**
 * # Obtém detalhes de uma trilha
 *
 * > Entrega os dados da trilha em especifico.
 */
railRouter.get("/:id", railController.findOne);

/**
 * # Cria uma trilha
 *
 * > Para criar uma trilha é necessário prover informações básicas da trilha.
 * > Com uma trilha criada é possível criar tópicos relacionados a ela.
 */
railRouter.post("/", authMiddleware, is(["admin"]), railController.create);

/**
 * # Altera as informações básicas de uma trilha
 */
railRouter.put("/:id", authMiddleware, is(["admin"]), railController.update);

/**
 * # Oculta uma trilha e todos os seus tópicos
 *
 * > Não é uma boa ideia remover ~completamente as trilhas então apenas as ocultamos
 */
railRouter.delete("/:id", authMiddleware, is(["admin"]), railController.remove);

export { railRouter };
