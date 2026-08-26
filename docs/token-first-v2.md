# External Intelligence Token-First v2

Status: COMPLETE (implementation baseline)

## Scope
Development support only. Token reduction is the primary KPI; response speed, retrieval quality, and self-improvement are secondary and must not expand product scope.

## Runtime baseline
- Repository HEAD cache: unchanged HEAD skips intelligence retrieval.
- Cache-hit response: compact snapshot reference and zero knowledge items.
- Cache-miss response: compact project snapshot.
- Knowledge payload: id, title, summary, confidence only.
- Default retrieval budget: 2 knowledge items / 4000 chars.
- Explicit callers may request larger budgets up to existing safety caps.
- HTTP and MCP use the same token-first policy.

## Measurement
`token_ledger` records only lightweight metrics: workspace/project/task, HEAD, cache hit, context chars, estimated context tokens, knowledge count, retrieval latency. It does not duplicate conversation or knowledge bodies.

`GET /api/development/kpis` exposes the v2 measurement baseline including average estimated tokens/task, average context size, cache-hit rate, retrieval time, knowledge count, cache hit/miss token averages, and estimated cache token reduction rate.

Estimated tokens are explicitly estimates, not provider-reported LLM usage.

## Optimization rule
Prefer the smallest context that succeeds. Do not automatically increase retrieval budget from aggregate metrics alone. Larger context is opt-in/lazy retrieval until task-success evidence exists. This prevents self-optimization from silently increasing token consumption.

## Completion gate
The implementation baseline is complete when:
1. HTTP and MCP token-first contracts match.
2. Cache, compact snapshot, compact knowledge and budget controls are active.
3. Ledger/KPI measurement is active.
4. Database E2E and retrieval benchmark pass.
5. Main CI is green.

Further changes are performance tuning against real ledger data, not v2 scope expansion.
