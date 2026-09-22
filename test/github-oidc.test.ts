import test from 'node:test';
import assert from 'node:assert/strict';
import { generateKeyPairSync, sign } from 'node:crypto';
import {
  EIS_GITHUB_OIDC_AUDIENCE,
  validateGitHubOidcClaims,
  verifyGitHubOidcToken,
} from '../src/github-oidc.js';

const enc = (value: unknown) => Buffer.from(JSON.stringify(value)).toString('base64url');

test('GitHub OIDC claim policy requires the trusted owner identity', () => {
  const now = Math.floor(Date.now() / 1000);
  const valid = {
    iss: 'https://token.actions.githubusercontent.com',
    aud: EIS_GITHUB_OIDC_AUDIENCE,
    exp: now + 300,
    nbf: now - 10,
    repository: 'karukimori-wq/Velvet',
    repository_owner: 'karukimori-wq',
    repository_owner_id: '288801654',
  };
  assert.equal(validateGitHubOidcClaims(valid, now).repository, 'karukimori-wq/Velvet');
  assert.throws(
    () => validateGitHubOidcClaims({ ...valid, repository_owner_id: '999' }, now),
    /OIDC_OWNER_ID_NOT_ALLOWED/,
  );
});

test('GitHub OIDC JWT signature is verified against GitHub JWKS', async () => {
  const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
  const jwk = publicKey.export({ format: 'jwk' });
  const header = enc({ alg: 'RS256', typ: 'JWT', kid: 'test-key' });
  const now = Math.floor(Date.now() / 1000);
  const payload = enc({
    iss: 'https://token.actions.githubusercontent.com',
    aud: EIS_GITHUB_OIDC_AUDIENCE,
    exp: now + 300,
    nbf: now - 10,
    repository: 'karukimori-wq/numeria-studio-site',
    repository_owner: 'karukimori-wq',
    repository_owner_id: '288801654',
    run_id: '123',
  });
  const input = `${header}.${payload}`;
  const signature = sign('RSA-SHA256', Buffer.from(input), privateKey).toString('base64url');
  const token = `${input}.${signature}`;
  const fetchImpl = (async () => new Response(JSON.stringify({ keys: [{ ...jwk, kid: 'test-key', alg: 'RS256', use: 'sig' }] }), { status: 200 })) as typeof fetch;
  const claims = await verifyGitHubOidcToken(token, fetchImpl);
  assert.equal(claims.repository, 'karukimori-wq/numeria-studio-site');
});
