import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.string().default('development'),
  ORIGINS: z.string().default('http://localhost:3000'),
  DATABASE_URL: z.string(),
  JWT_EXPIRATION: z.string().default('1h'),
  URL: z.string().default('http://localhost:3000'),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);

export const isProduction = env.NODE_ENV === 'production';

export const isDevelopment = env.NODE_ENV === 'development';
