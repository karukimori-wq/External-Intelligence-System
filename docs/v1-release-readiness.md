# External Intelligence v1 Release Readiness

## Status: RELEASED

External Intelligence v1 is released as a model-independent shared development-intelligence hub for parallel application development.

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
- GitHub Actions quality CI passed after workflow syntax repair
- database-backed HTTP/MCP development-hub E2E was wired into main CI and the final verification CI completed green after `DATABASE_URL` was configured

## v1 release contract

A development client may:

1. open a project development session;
2. retrieve the latest project snapshot plus relevant durable intelligence;
3. implement and verify work in its own chat/agent environment;
4. detect repository divergence before publishing state;
5. publish a version-checked project snapshot;
6. record experience, evidence and verification;
7. allow another concurrent or later AI client to retrieve and reuse the accumulated development intelligence.

The shared intelligence belongs to External Intelligence, not to a specific chat model or AI vendor.

## Post-v1 improvements (non-blocking)

- production embedding provider and broader embedding coverage
- reranker evaluation when retrieval benchmarks justify it
- graph projection where relationship traversal adds measurable value
- richer agent authentication/authorization and operational dashboards

These improve retrieval quality and operations without changing the v1 interoperability contract.
