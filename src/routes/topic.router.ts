import { Router } from "express";
import basicController from "../controllers/basic-controller";
import { authMiddleware } from "../middlewares/jwt";
import { zValidate } from "../middlewares/zod";
import { textContentSchema, urlSchema, videoUrlSchema } from "./validators";

const topicRouter = Router();

/**
 * # Lista todos tópicos para uma determinada trilha
 *
 * > Devolve apenas as informações básicas dos tópicos.
 */
topicRouter.get("/", basicController.getSample);

/**
 * # Obtém detalhes de um tópico para uma determinada trilha
 *
 * > Entrega os dados de um tópico juntamente com seus recursos.
 * > Caso seja um recurso de texto então uma URL para consumir o recurso por completo é disponibilizada.
 */
topicRouter.get("/link/:id", basicController.getSample);
topicRouter.get("/video/:id", basicController.getSample);
topicRouter.get("/text/:id", basicController.getSample);

/**
 * # Cria um tópico para uma trilha existente
 */
topicRouter.post(
  "/link",
  authMiddleware,
  zValidate(urlSchema),
  basicController.getSample
);

topicRouter.post(
  "/video",
  authMiddleware,
  zValidate(videoUrlSchema),
  basicController.getSample
);

topicRouter.post(
  "/text",
  authMiddleware,
  zValidate(textContentSchema),
  basicController.getSample
);

/**
 * # Altera o tópico de uma trilha existente
 */
topicRouter.put(
  "/link/:id",
  authMiddleware,
  zValidate(urlSchema),
  basicController.getSample
);

topicRouter.put(
  "/video/:id",
  authMiddleware,
  zValidate(videoUrlSchema),
  basicController.getSample
);

topicRouter.put(
  "/text/:id",
  authMiddleware,
  zValidate(textContentSchema),
  basicController.getSample
);

topicRouter.delete("/:id", authMiddleware, basicController.getSample);

export { topicRouter };
