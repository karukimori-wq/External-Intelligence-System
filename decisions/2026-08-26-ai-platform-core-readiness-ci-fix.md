# AI Platform Core readiness CI fix

Date: 2026-08-26 JST
Repository: karukimori-wq/ai-platform-core

## Context

AI Platform Core development continued from the Cloudflare/D1 production-ready baseline. A new aggregate readiness surface had been added to the Cloudflare Worker at `/v1/readiness` and `/api/readiness` so Platform Admin and production verification can check the main operational prerequisites through one endpoint.

## Change implemented

The previous readiness implementation introduced an empty `catch {}` block in `apps/cloudflare-worker/src/index.ts`.

GitHub Actions CI failed at `pnpm lint` with ESLint `no-empty` for the Cloudflare Worker package.

The fix updated the readiness dependency failure path to explicitly set:

- `checks.persistence = false`
- `checks.eventStore = false`

This preserves the intended safe behavior: if D1/Event Store checks fail, readiness reports warning/non-ready without exposing internals or throwing through the health surface.

## Verification status

- Commit pushed to AI Platform Core main: `49354b5d76271f8f1862d093b4119c060a371fea`
- CI run started: `32908239466`
- At the time of recording, the CI run was still in progress.

## Reusable learning

For compact Cloudflare Worker readiness endpoints, avoid empty failure handlers even when the response intentionally falls back to non-ready status. Record explicit failed check values so lint, operator diagnostics, and readiness semantics stay aligned.

## Safety notes

No secrets, credentials, tokens, DB connection strings, prompts containing secrets, or personal data were recorded.
