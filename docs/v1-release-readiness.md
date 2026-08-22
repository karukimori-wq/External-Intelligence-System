# External Intelligence v1 Release Readiness

## Status: RELEASE CANDIDATE

The v1 product goal is a model-independent shared development-intelligence hub for parallel application development.

## Verified implementation

- durable Experience / Evidence / Verification / Knowledge plane
- cross-project learning and contradiction preservation
- PostgreSQL source of truth
- HTTP intelligence interfaces
- MCP intelligence interfaces
- development session schema
- project snapshot schema with optimistic versioning
- coordination event schema
- repository divergence representation
- model-neutral `agentId` / `clientType`
- HTTP development coordination interface
- MCP development coordination capability contracts and handlers
- real Supabase coordination schema migration
- real DB smoke test: project snapshot persisted
- real DB smoke test: a second AI/client session can record repository divergence (`abc` -> `def`)

## Release blockers

1. Latest main `npm run check` / GitHub Actions quality gate must pass after the v0.5 development-hub changes.
2. HTTP/MCP route-level E2E must be executed against a running server, not only direct DB smoke tests.
3. End-to-end handoff must prove: Agent A records development knowledge/state -> Agent B retrieves it in a later/parallel session.
4. Workspace isolation must be rechecked for development sessions/snapshots/coordination events.

## Explicitly non-blocking for v1

- production embedding provider
- embedding coverage >= 80%
- reranker adoption
- graph projection

Those are retrieval-quality improvements and do not define whether the model-independent shared-development loop exists.

## Release definition

v1 becomes `RELEASED` only when the four blockers above have objective evidence. Do not mark released from implementation completeness alone.
