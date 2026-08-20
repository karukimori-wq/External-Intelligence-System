# Hybrid Retrieval Contract

External Intelligence must not dump the whole memory corpus into an agent context. Retrieval is deliberately selective.

## Retrieval pipeline

1. Scope by `workspace_id` and optional project/repository constraints.
2. Generate candidates from full-text and vector similarity.
3. Apply metadata and lifecycle filters.
4. Rank with evidence quality, confidence, success rate, cross-project reuse and recency.
5. Prefer promoted rules/skills over raw experiences when both answer the same need.
6. Return a small context bundle with provenance.

## Ranking signals

- semantic similarity
- full-text relevance
- confidence
- verification strength
- success / failure ratio
- contradiction count
- projects seen
- lifecycle stage
- recency
- repository/framework/language compatibility

No single signal is authoritative.

## Context budget

Default retrieval should return no more than:

- 3 promoted rules or skills
- 3 supporting patterns/observations
- 2 raw experiences when needed for evidence

The caller may request a larger evidence bundle explicitly.

## Provenance

Every returned knowledge item must include enough provenance to trace it to its evidence and, when applicable, repository, commit, test result, issue, PR, or artifact.

## Safety rules

- Never retrieve across workspaces unless explicitly authorized.
- Deprecated knowledge is excluded by default.
- Contradicted knowledge must expose contradiction metadata.
- Raw logs are not inserted into context by default; retrieve excerpts first and fetch the underlying artifact only on demand.
