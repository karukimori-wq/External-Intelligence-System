import { z } from 'zod';

const schema = z.object({
  PORT: z.coerce.number().int().positive().default(8787),
  DATABASE_URL: z.string().min(1).optional(),
  EXTERNAL_INTELLIGENCE_API_TOKEN: z.string().min(32).optional(),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development')
}).superRefine((value,ctx)=>{
  if(value.NODE_ENV==='production'&&!value.EXTERNAL_INTELLIGENCE_API_TOKEN){
    ctx.addIssue({code:'custom',path:['EXTERNAL_INTELLIGENCE_API_TOKEN'],message:'Required in production'});
  }
});

export type AppConfig = z.infer<typeof schema>;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  return schema.parse(env);
}
