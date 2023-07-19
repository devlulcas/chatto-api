import { App } from './app';
import { env } from './configs';
import { authRouter } from './routes';

const app = new App({ env, prefix: '/api/v1' });

app.registerRouter('/auth', authRouter);

app.registerRouter('/auth', authRouter);

app.start();
