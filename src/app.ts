import 'dotenv/config';
import 'express-async-errors';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Router } from 'express';
import http, { Server as HttpServer } from 'node:http';
import { prisma } from './configs';
import { Env } from './configs/env';
import { errorHandler } from './middlewares/error-handler';

type ExpressApp = ReturnType<typeof express>;

type AppOptions = {
  env: Env;
  prefix?: string;
  routers?: Record<string, Router>;
};

export class App {
  private env: Env;
  private server: HttpServer;
  private app: ExpressApp;
  private routers: Record<string, Router> = {};
  private prefix: string;

  constructor(options: AppOptions) {
    this.env = options.env;

    this.prefix = options.prefix ?? '';

    this.app = express();

    this.server = http.createServer(this.app);

    this.init();
  }

  private init() {
    this.initMiddlewares();
    this.initErrorHandling();
  }

  private initMiddlewares() {
    this.app.use(
      cors({
        origin: this.env.ORIGINS,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        credentials: true,
      }),
    );

    this.app.use(express.json());

    this.app.use(cookieParser());
  }

  private initRoutes() {
    for (const [path, router] of Object.entries(this.routers)) {
      this.app.use(this.prefix + path, router);
    }
  }

  private initErrorHandling() {
    this.app.use(errorHandler);
  }

  private async gracefulShutdown() {
    await prisma.$disconnect();

    this.server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  }

  public start() {
    this.initRoutes();

    this.server.listen(this.env.PORT, () => {
      console.log(`Server listening on port ${this.env.PORT}`);
    });

    process.on('SIGTERM', this.gracefulShutdown);
    process.on('SIGINT', this.gracefulShutdown);
  }

  public registerRouter(path: string, router: Router) {
    this.routers[path] = router;
  }
}
