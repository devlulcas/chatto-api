import { Router } from "express";
import authController from "../controllers/auth.controller";
import { zValidate } from "../middlewares/zod";
import { signInSchema, signUpSchema } from "./validators";

const authRouter = Router();

// Sign In
authRouter.post("/sign-in", zValidate(signInSchema), authController.signIn);

// Sign Out
authRouter.post("/sign-up", zValidate(signUpSchema), (req, res) => {
  return authController.signUp(req, res);
});

// Sign Up
authRouter.post("/sign-out", authController.signOut);

export { authRouter };
