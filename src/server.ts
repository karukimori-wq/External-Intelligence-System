import Fastify from 'fastify';
import cors from '@fastify/cors';
import { ExperienceInput, VerificationInput } from './domain.js';
import { loadConfig } from './config.js';
import { IntelligenceStore } from './store.js';

export async function buildServer() {
  const config = loadConfig();
  const app = Fastify({ logger: true });
  await app.register(cors, { origin: false });
  const store = config.DATABASE_URL ? new IntelligenceStore(config.DATABASE_URL) : null;

  app.get('/health', async () => ({ status: 'ok' }));
  app.get('/version', async () => ({ name: 'external-intelligence-system', version: '0.1.0' }));
  app.get('/readiness', async (_request, reply) => {
    if (!store) return reply.code(503).send({ status: 'error', databaseConfigured: false });
    try {
      const databaseReachable = await store.ping();
      return { status: databaseReachable ? 'success' : 'error', databaseConfigured: true, databaseReachable };
    } catch {
      return reply.code(503).send({ status: 'error', databaseConfigured: true, databaseReachable: false });
    }
  });

  app.post('/api/experiences', async (request, reply) => {
    if (!store) return reply.code(503).send({ error: 'DATABASE_NOT_CONFIGURED' });
    const parsed = ExperienceInput.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: 'INVALID_EXPERIENCE', issues: parsed.error.issues });
    const experience = await store.createExperience(parsed.data);
    return reply.code(201).send({ experience });
  });

  app.get<{ Params: { experienceId: string } }>('/api/experiences/:experienceId', async (request, reply) => {
    if (!store) return reply.code(503).send({ error: 'DATABASE_NOT_CONFIGURED' });
    const experience = await store.getExperience(request.params.experienceId);
    if (!experience) return reply.code(404).send({ error: 'EXPERIENCE_NOT_FOUND' });
    return { experience };
  });

  app.post<{ Params: { experienceId: string } }>('/api/experiences/:experienceId/verifications', async (request, reply) => {
    if (!store) return reply.code(503).send({ error: 'DATABASE_NOT_CONFIGURED' });
    const parsed = VerificationInput.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: 'INVALID_VERIFICATION', issues: parsed.error.issues });
    const verification = await store.addVerification(request.params.experienceId, parsed.data);
    return reply.code(201).send({ verification });
  });

  app.addHook('onClose', async () => { if (store) await store.close(); });
  return app;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const config = loadConfig();
  const app = await buildServer();
  await app.listen({ host: '0.0.0.0', port: config.PORT });
}
