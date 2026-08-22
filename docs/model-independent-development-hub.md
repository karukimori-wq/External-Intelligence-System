# Model-Independent Parallel Development Hub

## Product role

External Intelligence is the shared development-intelligence hub for multiple applications, chats and AI agents operating concurrently. It is not a ChatGPT-specific memory service and it is not a single development chat.

## Topology

Multiple development sessions may run at the same time:

- ChatGPT / Codex session for Growth Engine
- ChatGPT / Codex session for Communication Planner
- another AI agent for SNS Planner
- another AI agent for a future application
- a session developing External Intelligence itself

Every session reads from and writes to the same External Intelligence boundary using workspace/project/session identity.

## Two shared planes

### Long-term intelligence plane

Stores durable, evidence-backed learning:

- Experience
- Evidence
- Verification
- Observation
- Pattern
- Rule
- Skill
- contradiction, revision, supersession and provenance

### Development coordination plane

Stores current parallel-development state, separately from durable knowledge:

- projectId
- developmentSessionId
- agentId / client type
- repository and branch
- current task
- status
- blockers
- base commit
- last observed commit
- last verified commit
- snapshot version
- updatedAt

A progress snapshot is not automatically treated as validated knowledge.

## Session lifecycle

1. An agent opens a development session for a project.
2. External Intelligence returns the latest project snapshot plus relevant durable knowledge.
3. The agent records its base commit before modifying code.
4. During work it may publish progress snapshots and experiences.
5. Before writing or declaring completion it compares the current repository head with its base/last-observed commit.
6. Divergence caused by another concurrent session is surfaced as a coordination event; it must not be silently overwritten.
7. Verification evidence is recorded after tests/CI.
8. The project snapshot advances only with explicit provenance to the session and commit.
9. Durable learning enters the existing evidence/verification/promotion pipeline.

## Concurrency rules

- Never use last-write-wins for project snapshots without a version/base check.
- Never overwrite contradictory knowledge; preserve both claims and evidence.
- Every write must carry workspaceId, projectId and developmentSessionId where applicable.
- Repository commit provenance is required for code-derived completion claims.
- Sessions from different AI vendors are peers; trust is based on credentials, permissions and evidence, not vendor identity.

## Interoperability boundary

External Intelligence exposes model-neutral capabilities through HTTP API and MCP. Clients should depend on the capability contract rather than database tables.

Minimum capabilities:

- open development session
- retrieve development context
- retrieve durable intelligence
- record experience/evidence/verification
- publish/read project snapshot
- report blocker
- detect repository/session divergence
- close development session

Embedding and reranking are internal retrieval optimizations. They are not prerequisites for another AI provider to participate in the development loop.
