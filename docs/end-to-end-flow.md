# Phase 1 End-to-End Flow

1. A loop runtime starts a LoopRun with workspace/project/repository identity.
2. Each implementation/verification iteration records LoopEvents and fingerprints.
3. Objective verification results become VerificationRuns and Evidence.
4. LoopController decides continue/retry/complete/escalate/stop.
5. Finalized work becomes an Experience; failed attempts remain evidence.
6. Evidence-backed Observations are created.
7. Similar observations from independent projects may synthesize a candidate Pattern.
8. Signals recalculate confidence and lifecycle; contradictions can lower or deprecate knowledge.
9. Validated Pattern/Rule items appear in promotion candidates.
10. Promotion rendering creates reviewable Decision or SKILL.md artifacts.
11. MCP search returns compact validated intelligence to a later coding agent.
12. The later loop produces new evidence, closing the learning cycle.

## Completion rule

Phase 1 is not complete until this flow is demonstrated against a real PostgreSQL database with migrations applied, tests passing, workspace isolation verified, and at least one cross-project pattern retrieved through the MCP surface.
