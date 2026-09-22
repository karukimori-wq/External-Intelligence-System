import { createPublicKey, verify as verifySignature, type JsonWebKey } from 'node:crypto';

const ISSUER = 'https://token.actions.githubusercontent.com';
const JWKS_URL = 'https://token.actions.githubusercontent.com/.well-known/jwks';
export const EIS_GITHUB_OIDC_AUDIENCE = 'https://external-intelligence-system.vercel.app';
export const EIS_GITHUB_OWNER = 'karukimori-wq';
export const EIS_GITHUB_OWNER_ID = '288801654';

type JwtHeader = { alg?: string; kid?: string; typ?: string };
export type GitHubOidcClaims = {
  iss?: string;
  aud?: string | string[];
  sub?: string;
  exp?: number;
  nbf?: number;
  iat?: number;
  repository?: string;
  repository_id?: string;
  repository_owner?: string;
  repository_owner_id?: string;
  sha?: string;
  ref?: string;
  run_id?: string;
  workflow_ref?: string;
  job_workflow_ref?: string;
};

type Jwk = JsonWebKey & { kid?: string; alg?: string; use?: string; kty?: string };
let cached: { expiresAt: number; keys: Jwk[] } | null = null;

function decodePart<T>(part: string): T {
  return JSON.parse(Buffer.from(part, 'base64url').toString('utf8')) as T;
}

function audienceMatches(aud: GitHubOidcClaims['aud'], expected: string) {
  return typeof aud === 'string' ? aud === expected : Array.isArray(aud) && aud.includes(expected);
}

export function validateGitHubOidcClaims(
  claims: GitHubOidcClaims,
  nowSeconds = Math.floor(Date.now() / 1000),
) {
  if (claims.iss !== ISSUER) throw new Error('OIDC_INVALID_ISSUER');
  if (!audienceMatches(claims.aud, EIS_GITHUB_OIDC_AUDIENCE)) throw new Error('OIDC_INVALID_AUDIENCE');
  if (!claims.exp || claims.exp < nowSeconds - 30) throw new Error('OIDC_EXPIRED');
  if (claims.nbf && claims.nbf > nowSeconds + 30) throw new Error('OIDC_NOT_ACTIVE');
  if (claims.repository_owner !== EIS_GITHUB_OWNER) throw new Error('OIDC_OWNER_NOT_ALLOWED');
  if (String(claims.repository_owner_id ?? '') !== EIS_GITHUB_OWNER_ID) throw new Error('OIDC_OWNER_ID_NOT_ALLOWED');
  if (!claims.repository?.startsWith(`${EIS_GITHUB_OWNER}/`)) throw new Error('OIDC_REPOSITORY_NOT_ALLOWED');
  return claims;
}

async function getKeys(fetchImpl: typeof fetch): Promise<Jwk[]> {
  if (cached && cached.expiresAt > Date.now()) return cached.keys;
  const response = await fetchImpl(JWKS_URL, { headers: { accept: 'application/json' } });
  if (!response.ok) throw new Error(`OIDC_JWKS_HTTP_${response.status}`);
  const body = (await response.json()) as { keys?: Jwk[] };
  if (!Array.isArray(body.keys) || body.keys.length === 0) throw new Error('OIDC_JWKS_EMPTY');
  cached = { keys: body.keys, expiresAt: Date.now() + 10 * 60 * 1000 };
  return body.keys;
}

export async function verifyGitHubOidcToken(token: string, fetchImpl: typeof fetch = fetch) {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('OIDC_MALFORMED');
  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  const header = decodePart<JwtHeader>(encodedHeader);
  if (header.alg !== 'RS256' || !header.kid) throw new Error('OIDC_UNSUPPORTED_HEADER');
  const keys = await getKeys(fetchImpl);
  const jwk = keys.find((candidate) => candidate.kid === header.kid && candidate.kty === 'RSA');
  if (!jwk) throw new Error('OIDC_KEY_NOT_FOUND');
  const key = createPublicKey({ key: jwk, format: 'jwk' });
  const signingInput = Buffer.from(`${encodedHeader}.${encodedPayload}`);
  const signature = Buffer.from(encodedSignature, 'base64url');
  if (!verifySignature('RSA-SHA256', signingInput, key, signature)) throw new Error('OIDC_INVALID_SIGNATURE');
  return validateGitHubOidcClaims(decodePart<GitHubOidcClaims>(encodedPayload));
}
