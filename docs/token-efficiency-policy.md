# Token Efficiency Policy

External Intelligence must reduce repeated context cost instead of increasing it.

## Default development context

A normal development-context response should include:

1. one project snapshot;
2. the top 3 relevant knowledge items;
3. compact fields only: `id`, `title`, `kind`, `summary`, `confidence`, `projectId`, `tags`;
4. a response budget section showing returned item count and character count.

The default context budget is 6,000 characters. The hard maximum retrieval count is 5 knowledge items.

## Evidence is lazy-loaded

Evidence bodies, verification histories, long excerpts and contradiction details are not returned in normal context retrieval. A client must call `knowledge_explain` only when it needs the evidence for a specific knowledge item.

## Snapshot discipline

Project snapshots are short operational state, not a full project history. Keep these fields compact:

- current task: max 500 chars
- blocker: max 500 chars
- status: max 100 chars

Long reasoning, failed attempts and reusable lessons belong in Experience / Evidence / Knowledge, not in snapshots.

## Writeback discipline

Do not record raw chat transcripts. Write back only:

- what changed;
- what was verified;
- what failed and how it was fixed;
- what reusable knowledge was learned;
- latest commit / deployment evidence;
- next compact task.

## Escalation rule

Start compact. Fetch details only on demand.

Preferred sequence:

1. `development_context_get`
2. implement or inspect repository
3. call `knowledge_explain` only for the 1-2 knowledge items that actually matter
4. record compact Experience / Evidence / Verification
5. publish compact Snapshot
