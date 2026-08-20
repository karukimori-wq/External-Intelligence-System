# MCP Intelligence Interface

The MCP surface is intentionally small so agents retrieve only what they need.

## Tools

### intelligence_search
Input: workspaceId, query, optional repository/project/environment filters, limit.
Output: compact ranked rules, skills, patterns and selected experiences with provenance.

### experience_record
Records an engineering loop experience and repository/commit/task context.

### evidence_record
Attaches test output, build logs, diffs, issue/PR references, artifacts or excerpts to an experience.

### verification_record
Records objective verification results. A model's statement that work succeeded is not verification.

### contradiction_record
Adds evidence that conflicts with an existing knowledge item and triggers lifecycle recalculation.

### knowledge_explain
Returns confidence inputs, provenance, supporting evidence, contradictions and lifecycle history for one item.

### promotion_candidates
Returns validated items eligible for human-reviewed publication as rules or skills.

## Context discipline

`intelligence_search` returns compact summaries first. Raw evidence and full artifacts require an explicit follow-up call. This protects prompt/cache locality and avoids repeatedly injecting the entire memory corpus.

## Write boundary

MCP may propose Git promotion content, but publication to Git must be a separate auditable action. Database memory and Git-published intelligence remain distinct layers.
