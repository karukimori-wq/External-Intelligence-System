# Professional Platform Contracts Status Knowledge

Status date: 2026-08-24

## Scope

This record captures the latest verified development state retrieved from `karukimori-wq/professional-platform-contracts` and the development result recorded back into External Intelligence.

External Intelligence should treat this as observed project knowledge, not as executable implementation code.

## Retrieved Sources

Repository: `karukimori-wq/professional-platform-contracts`

Latest verified main commit:

```text
373b80f3e75bd8026f4bd15cbe6d71b3d2cb682a
Add platform infrastructure migration matrix
```

Relevant files verified:

- `docs/release-readiness/communication-planner-cloudflare-migration-result.md`
- `docs/release-readiness/infrastructure-migration-matrix.md`

## Current Development Result

`professional-platform-contracts` now tracks more than API contracts. It is being used as the Professional Platform control-plane documentation repository for:

- Contracts
- Responsibility boundaries
- Source of truth ownership
- Integration state
- Infrastructure policy
- Cloudflare migration status
- Production readiness
- Cross-app roadmap

The repository remains documentation-only. Implementation code remains in each application repository.

## Communication Planner Knowledge

Communication Planner Cloudflare migration is complete.

Current verified state:

- Repository: `karukimori-wq/Communication-Planner`
- Runtime: Cloudflare Workers
- Persistence: Cloudflare D1
- MVP status: completed
- Current phase: real_provider_integration
- Cloudflare migration status: completed

Verified persistence evidence recorded in contracts:

- `driver`: `d1`
- `d1Configured`: `true`
- `d1Reachable`: `true`
- `databaseBackedPersistenceReady`: `true`
- `roundtripReady`: `true`

Communication Planner owns:

- Unified Inbox
- Communication Person projection
- ChannelIdentity
- Conversation
- Message
- ConversationContext
- Topic
- Promise
- Communication NextAction
- ReplyDraft
- SafetyCheck
- ReplySendDecision
- ChannelAdapter integration state

Communication Planner must not own:

- Customer master
- Lead lifecycle
- Reservation
- Payment
- Sales / Revenue
- SNS PostDraft
- Numeria Report
- Velvet Professional Memory
- AI Usage

## Platform Matrix Knowledge

The current infrastructure matrix records these app-level states:

| App | Runtime | Persistence | Production readiness | Cloudflare migration status | Current phase |
| --- | --- | --- | --- | --- | --- |
| professional-platform-contracts | GitHub documentation repository | Not applicable | Not applicable | not_required | contract_governance |
| Growth Engine | Vercel | Postgres | external_pilot_ready | not_evaluated | external_pilot |
| Numeria Studio | ChatGPT Sites | not_evaluated | mvp_ready_with_environment_warning | not_evaluated | mvp_operations |
| SNS Planner | ChatGPT Sites | not_evaluated | mvp_ready_with_ai_core_environment_warning | not_evaluated | postdraft_and_messagedraft_mvp |
| Communication Planner | Cloudflare Workers | Cloudflare D1 | mvp_completed | completed | real_provider_integration |
| AI Platform Core | ChatGPT Sites preview | not_evaluated | mvp_ready | not_evaluated | ai_activity_usage_capability |
| Platform Admin | ChatGPT Sites preview | Operational snapshots only | mvp_ready | not_evaluated | monitoring |
| Velvet | Vercel | production_verification_pending | needs_persistence_verification | in_progress | professional_memory_mvp |

## Source of Truth Rules

The confirmed platform ownership rules are:

- Growth Engine owns Customer, Lead, Reservation, Payment, Sales, Revenue, Funnel, Follow-up, Referral.
- Numeria Studio owns Session and Report.
- SNS Planner owns PostDraft and MessageDraft.
- Communication Planner owns one-to-one communication state, messages, context, safety checks, and send decisions.
- Velvet owns Professional Memory, Visit, Note, Timeline, and NextAction.
- AI Platform Core owns AI Activity, AI Usage, and AI Capability.
- Platform Admin owns operational snapshots only.

Cloudflare migration must not change application responsibility boundaries.

## Reusable Decision Rule

When an app completes an infrastructure migration, record it in `professional-platform-contracts` with all of the following:

- Runtime
- Persistence
- Production readiness
- Migration status
- Current phase
- Source-of-truth boundary
- Verified production evidence
- Remaining integration or provider work

Do not infer migration status from old notes. Check the target application repository main and production evidence before changing status.

## Next Retrieval Targets

Future agents should retrieve these items when continuing platform coordination:

1. `professional-platform-contracts/docs/release-readiness/infrastructure-migration-matrix.md`
2. `professional-platform-contracts/docs/release-readiness/communication-planner-cloudflare-migration-result.md`
3. Communication Planner provider readiness endpoints and production status before marking LINE / Instagram / X as live.
4. Velvet persistence status before marking Velvet MVP ready.
5. Platform Admin monitoring docs before assuming a status is visible in the admin UI.

## Development Record Written To External Intelligence

This External Intelligence record was created after verifying the latest contracts main and relevant release-readiness files.

No secrets, database URLs, access tokens, provider credentials, customer personal data, payment data, report bodies, professional memory bodies, or message bodies are included in this record.
