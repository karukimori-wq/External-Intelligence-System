# Development Hub API v1

External Intelligence exposes the same development-coordination capabilities to any authorized AI client. The API is model-neutral; `agentId` and `clientType` identify the caller without granting trust by vendor name.

## HTTP

### Open session
`POST /api/development/sessions`

Required: `workspaceId`, `projectId`, `agentId`, `clientType`, `repository`. Optional: `branch`, `baseCommit`, `currentTask`, `metadata`.

### Get development context
`POST /api/development/context`

Required: `workspaceId`, `projectId`, `query`. Returns the latest project snapshot and relevant durable intelligence.

### Publish project snapshot
`PUT /api/development/snapshot`

Use `expectedVersion` when updating an existing snapshot. A stale version returns HTTP 409 instead of silently overwriting another session.

### Check repository divergence
`POST /api/development/divergence`

Compares a session's expected/base commit with the currently observed repository commit. Divergence is persisted as a coordination event.

Existing experience/evidence/verification/intelligence endpoints remain the durable-learning plane.

## MCP

The same boundary is available as tools:

- `development_session_open`
- `development_context_get`
- `project_snapshot_get`
- `project_snapshot_publish`
- `development_divergence_check`
- `intelligence_search`
- `experience_record`
- `evidence_record`
- `verification_record`

## Standard client loop

1. Open a development session.
2. Retrieve development context before implementation.
3. Read the repository and record/confirm the base commit.
4. Implement and test.
5. Check divergence before publishing completion state.
6. Publish a version-checked project snapshot.
7. Record experience, evidence and verification.
8. A later session, chat or AI provider retrieves the shared context and continues.

Embedding is optional internal retrieval optimization and is not part of this interoperability contract.
