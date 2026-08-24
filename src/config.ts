import { z } from 'zod';

const schema = z.object({
  PORT: z.coerce.number().int().positive().default(8787),
  DATABASE_URL: z.string().min(1).optional(),
  EXTERNAL_INTELLIGENCE_API_TOKEN: z.string().min(32).optional(),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development')
});

export type AppConfig = z.infer<typeof schema>;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  return schema.parse(env);
}
