import { Router } from "express";
import basicController from "../controllers/basic-controller";
import { zValidate } from "../middlewares/zod";
import { signInSchema, signUpSchema } from "./validators";

const authRouter = Router();

// Sign In
authRouter.post("/sign-in", zValidate(signInSchema), basicController.getSample);

// Sign Out
authRouter.post("/sign-up", zValidate(signUpSchema), basicController.getSample);

// Sign Up
authRouter.post("/sign-out", basicController.getSample);

export { authRouter };
