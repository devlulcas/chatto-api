import { Router } from "express";
import { is } from "../middlewares/is";
import { authMiddleware } from "../middlewares/jwt";
import railController from "../controllers/rail.controller";

const railRouter = Router();

/**
 * # Lista todas as trilhas
 *
 * > Devolve apenas as informações básicas das trilhas, não seus tópicos.
 */
railRouter.get("/", (req, res) => {
  return railController.findAll(req, res);
});

/**
 * # Obtém detalhes de uma trilha
 *
 * > Entrega os dados da trilha em especifico.
 */
railRouter.get("/:id", (req, res) => {
  return railController.findOne(req, res);
});

/**
 * # Cria uma trilha
 *
 * > Para criar uma trilha é necessário prover informações básicas da trilha.
 * > Com uma trilha criada é possível criar tópicos relacionados a ela.
 */
railRouter.post("/", authMiddleware, is(["admin"]), (req, res) => {
  return railController.create(req, res);
});

/**
 * # Altera as informações básicas de uma trilha
 */
railRouter.put("/:id", authMiddleware, is(["admin"]), (req, res) => {
  return railController.update(req, res);
});

/**
 * # Oculta uma trilha e todos os seus tópicos
 *
 * > Não é uma boa ideia remover ~completamente as trilhas então apenas as ocultamos
 */
railRouter.delete("/:id", authMiddleware, is(["admin"]), (req, res) => {
  return railController.remove(req, res);
});

export { railRouter };
