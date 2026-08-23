# External Intelligence v1 Release Readiness

## Status: RELEASE CANDIDATE

The v1 product goal is a model-independent shared development-intelligence hub for parallel application development.

## Verified implementation and evidence

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
- real DB smoke test: project snapshot persisted at version 1 / head `abc`
- real DB smoke test: ChatGPT-like Agent A and another-AI Agent B coexist for the same project
- real DB smoke test: Agent B divergence persisted (`abc` -> `def`)
- real handoff proof: Agent A experience/evidence produced validated knowledge `Typecheck before tests`
- real handoff proof: the shared workspace subsequently retrieved that knowledge by a development-problem query
- workspace isolation proof for handoff knowledge: foreign workspace visibility count = 0
- workspace isolation proof for coordination session lookup: foreign workspace count = 0
- GitHub Actions CI #123 passed after workflow syntax repair, including the required quality gate

## Remaining release blocker

1. HTTP/MCP route-level E2E must be executed against a running server, not only contract tests and direct database evidence.

## Explicitly non-blocking for v1

- production embedding provider
- embedding coverage >= 80%
- reranker adoption
- graph projection

Those are retrieval-quality improvements and do not define whether the model-independent shared-development loop exists.

## Release definition

v1 becomes `RELEASED` after the remaining route-level E2E has objective evidence. Implementation completeness alone is insufficient.
