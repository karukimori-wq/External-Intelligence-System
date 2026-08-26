create table if not exists token_ledger (
  id uuid primary key default gen_random_uuid(),
  workspace_id text not null,
  project_id text not null,
  task text,
  head_commit text,
  cache_hit boolean not null default false,
  context_chars integer not null default 0 check (context_chars >= 0),
  estimated_context_tokens integer not null default 0 check (estimated_context_tokens >= 0),
  knowledge_count integer not null default 0 check (knowledge_count >= 0),
  retrieval_ms integer not null default 0 check (retrieval_ms >= 0),
  created_at timestamptz not null default now()
);
create index if not exists token_ledger_workspace_project_created_idx on token_ledger(workspace_id, project_id, created_at desc);
create index if not exists token_ledger_created_idx on token_ledger(created_at desc);
