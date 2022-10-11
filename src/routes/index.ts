import { Router } from "express";
import basicController from "../controllers/basic-controller";

const router = Router();

router.get("/", basicController.getSample);

export { router };
