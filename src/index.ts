import { App } from "./app";
import { env } from "./configs";
import { authRouter } from "./routes";

const app = new App({ env });

app.registerRouter("/api/v1/auth", authRouter);

app.start();
