import { Router } from "express";
import authController from "../controllers/auth.controller";
import { zod } from "../middlewares/zod";
import { signInSchema, signUpSchema } from "./validators";

const authRouter = Router();

// Sign In
authRouter.post("/sign-in", zod(signInSchema), (req, res) => {
  return authController.signIn(req, res);
});

// Sign Out
authRouter.post("/sign-up", zod(signUpSchema), (req, res) => {
  return authController.signUp(req, res);
});

// Sign Up
authRouter.post("/sign-out", (req, res) => {
  return authController.signOut(req, res);
});

export { authRouter };
