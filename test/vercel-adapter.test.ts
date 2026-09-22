import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeInjectHeaders } from '../api/index.js';

test('Vercel adapter removes stale body framing headers before Fastify inject', () => {
  const normalized = normalizeInjectHeaders({
    host: 'external-intelligence-system.vercel.app',
    'content-type': 'application/json',
    'content-length': '1234',
    'transfer-encoding': 'chunked',
    authorization: 'Bearer token',
  });
  assert.equal(normalized['content-length'], undefined);
  assert.equal(normalized['transfer-encoding'], undefined);
  assert.equal(normalized['content-type'], 'application/json');
  assert.equal(normalized.authorization, 'Bearer token');
});
