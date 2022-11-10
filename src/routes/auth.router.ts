import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { Crypto } from "../lib/crypto.lib";
import { JWT } from "../lib/token.lib";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "../services/auth.service";

const authRouter = Router();

const userRepository = new UserRepository();
const crypto = new Crypto();
const tokenGenerator = new JWT();
const authService = new AuthService(userRepository, crypto, tokenGenerator);
const authController = new AuthController(authService);

// Sign In
authRouter.post("/sign-in", (req, res) => {
  return authController.signIn(req, res);
});

// Sign Out
authRouter.post("/sign-up", (req, res) => {
  return authController.signUp(req, res);
});

// Sign Up
authRouter.post("/sign-out", (req, res) => {
  return authController.signOut(req, res);
});

export { authRouter };
