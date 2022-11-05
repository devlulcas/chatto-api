import { Router } from "express";
import topicController from "../controllers/topic.controller";
import { is } from "../middlewares/is";
import { authMiddleware } from "../middlewares/jwt";
import { zod } from "../middlewares/zod";
import { textContentSchema, urlSchema, videoUrlSchema } from "./validators";

const topicRouter = Router();

/**
 * # Lista todos tópicos para uma determinada trilha
 *
 * > Devolve apenas as informações básicas dos tópicos.
 */
topicRouter.get("/:id", (req, res) => {
  return topicController.findOne(req, res);
});

/**
 * # Cria um tópico para uma trilha existente
 */
topicRouter.post("/", authMiddleware, is(["ADMIN"]), (req, res) => {
  return topicController.create(req, res);
});

/**
 * # Altera o tópico de uma trilha existente
 */
topicRouter.put("/:id", authMiddleware, is(["ADMIN"]), (req, res) => {
  return topicController.update(req, res);
});

/**
 * # Delete um tópico
 */
topicRouter.delete("/:id", authMiddleware, is(["ADMIN"]), (req, res) => {
  return topicController.remove(req, res);
});

export { topicRouter };
