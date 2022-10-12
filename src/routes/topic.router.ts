import { Router } from "express";
import topicController from "../controllers/topic.controller";
import { authMiddleware } from "../middlewares/jwt";
import { zValidate } from "../middlewares/zod";
import { textContentSchema, urlSchema, videoUrlSchema } from "./validators";

const topicRouter = Router();

/**
 * # Lista todos tópicos para uma determinada trilha
 *
 * > Devolve apenas as informações básicas dos tópicos.
 */
topicRouter.get("/", topicController.findAll);

/**
 * # Obtém detalhes de um tópico para uma determinada trilha
 *
 * > Entrega os dados de um tópico juntamente com seus recursos.
 * > Caso seja um recurso de texto então uma URL para consumir o recurso por completo é disponibilizada.
 */
topicRouter.get("/link/:id", topicController.getLink);
topicRouter.get("/video/:id", topicController.getVideo);
topicRouter.get("/text/:id", topicController.getText);

/**
 * # Cria um tópico para uma trilha existente
 */
topicRouter.post(
  "/link",
  authMiddleware,
  zValidate(urlSchema),
  topicController.createLink
);

topicRouter.post(
  "/video",
  authMiddleware,
  zValidate(videoUrlSchema),
  topicController.createVideo
);

topicRouter.post(
  "/text",
  authMiddleware,
  zValidate(textContentSchema),
  topicController.createText
);

/**
 * # Altera o tópico de uma trilha existente
 */
topicRouter.put(
  "/link/:id",
  authMiddleware,
  zValidate(urlSchema),
  topicController.updateLink
);

topicRouter.put(
  "/video/:id",
  authMiddleware,
  zValidate(videoUrlSchema),
  topicController.updateVideo
);

topicRouter.put(
  "/text/:id",
  authMiddleware,
  zValidate(textContentSchema),
  topicController.updateText
);

topicRouter.delete("/:id", authMiddleware, topicController.remove);

export { topicRouter };
