# Loop Runtime Adapter Contract

External Intelligence does not own a specific autonomous coding loop. Ralph-style loops, Codex-driven workflows, CI repair agents and future runtimes are adapters.

## Required lifecycle events

1. `loop.started`
2. `task.selected`
3. `implementation.changed`
4. `verification.completed`
5. `loop.retrying` or `loop.completed`
6. `experience.finalized`

## Adapter payload

Each adapter should provide when available:

- workspaceId / projectId
- repository / branch / commit SHA
- task identifier and task type
- changed files
- tool/actions summary
- verification commands and statuses
- issue / PR references
- timestamps
- final outcome

## Rules

- Do not store secrets or credentials in experience payloads.
- Large raw logs belong in object storage; retain URI/hash/excerpt as evidence.
- A retry is part of the same causal experience unless the task or hypothesis materially changes.
- Failed attempts are valuable evidence and must not be silently discarded.
- Loop runtimes are replaceable. Intelligence accumulated from one runtime must remain usable by another.
