# Cross-development learning

External Intelligence System must improve future development automatically. Recording data is not the goal; reducing repeated mistakes and reusing verified solutions is the goal.

## Development start

Preferred entry point: `POST /api/development/start`.

A client sends workspace/project identity, optional `appId` and `componentId`, repository/current task, and a natural-language query. EIS opens a development session and returns the latest project snapshot plus relevant durable intelligence in one response.

The client should surface the returned intelligence as task-specific cautions, proven patterns, known failures, and decision rules before implementation starts.

## Identity

Use three separate concepts:

- `appId`: product/application identity, for example `numeria-studio`.
- `componentId`: optional component identity, for example `web`, `worker`, or `api`.
- `repository`: concrete Git repository, for example `karukimori-wq/numeria-studio-site`.

`projectId` remains supported for backward compatibility and coordination metrics.

## Development fingerprint

Reusable results should include environment context when known:

- runtime
- framework
- database
- auth
- billing
- environment
- planModel
- appRole
- contractVersion
- nodeVersion

This prevents a solution proven in one environment from being treated as universally applicable.

## Completion is not binary

`success: true` means an implementation attempt succeeded at its reported level. It does not automatically mean the feature is usable in Production.

`POST /api/development/results` accepts a `verification` matrix:

- `productionDeployed`
- `uiReachable`
- `permissionVerified`
- `requiresPersistence` / `persistenceVerified`
- `requiresIntegration` / `integrationVerified`
- `humanVerified`

A result is `production_verified_success` only when Production, UI, permission, and every declared required dependency check pass. Only those results are eligible for automatic cross-project pattern synthesis.

Successful code/CI results without runtime verification remain `implementation_result` knowledge. They can be retrieved, but are not treated as proof that users can use the feature.

## Failures are reusable intelligence

Failed development results are retained as `known_failure` observations instead of being discarded. This allows future tasks to surface warnings such as stale deployment URLs, auth/plan boundary mistakes, or Production-only failures.

## Multilingual retrieval

Knowledge normalization preserves Unicode letters and numbers. Retrieval uses language-independent character n-gram similarity as a lexical baseline and can combine it with embeddings when an embedding profile is available. Japanese development notes therefore remain searchable and pattern candidates can be detected without translating them to English first.

## Cache rule

Repository HEAD equality alone is not enough for a context cache hit. A cached development context is reusable only when both:

1. the repository HEAD is unchanged, and
2. shared EIS knowledge has not changed since the project snapshot.

This allows a lesson learned in Growth Engine, Velvet, or another project to become visible to Numeria Studio even when Numeria's own commit has not changed.

## Automated capture

CI/CD clients should call `POST /api/development/results` after objective checks complete and set `source: "github_actions"`. Production smoke checks should send the runtime verification matrix rather than equating CI Green with user-visible completion.

Recommended rollout order:

1. professional-platform-contracts
2. Numeria Studio
3. Velvet
4. Growth Engine
5. AI Platform Core
6. Platform Admin
7. Feedback Hub
8. Communication Planner
9. SNS Planner

Each repository should use the same contract rather than inventing its own Knowledge format.
