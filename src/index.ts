import "dotenv/config";
import "express-async-errors";

import http from "node:http";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/error-handler";
import { authRouter, railRouter, topicRouter } from "./routes";

const PORT = process.env.PORT ?? 3333;

const app = express();

const server = http.createServer(app);

// CORS
const acceptedOrigins = process.env.ORIGINS ?? "*";

app.use(
  cors({
    origin: acceptedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// JSON Input
app.use(express.json());

// Cookies
app.use(cookieParser());

// API v1
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/rail", railRouter);
app.use("/api/v1/topic/:rail", topicRouter);

// Error handling
app.use(errorHandler);

const init = () => {
  try {
    server.listen(PORT, () => {
      if (process.env.NODE_ENV === "production") {
        const URL = process.env.URL;
        console.log(`You can open it at ${URL}/api/v1`);
      } else {
        console.log(`You can open it at http://localhost:${PORT}/api/v1`);
      }
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

init();
