CREATE TABLE knowledge_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  knowledge_id uuid NOT NULL REFERENCES knowledge_items(id) ON DELETE CASCADE,
  loop_run_id uuid REFERENCES loop_runs(id) ON DELETE SET NULL,
  experience_id uuid REFERENCES experiences(id) ON DELETE SET NULL,
  workspace_id text NOT NULL,
  project_id text NOT NULL,
  retrieval_rank integer,
  retrieval_score double precision,
  applied boolean NOT NULL DEFAULT false,
  outcome_status text CHECK (outcome_status IN ('success','warning','error','skipped')),
  iterations_before integer,
  iterations_after integer,
  verification_success boolean,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  retrieved_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);
CREATE INDEX knowledge_usage_knowledge_idx ON knowledge_usage(knowledge_id,retrieved_at DESC);
CREATE INDEX knowledge_usage_loop_idx ON knowledge_usage(loop_run_id,retrieved_at);
CREATE INDEX knowledge_usage_scope_idx ON knowledge_usage(workspace_id,project_id,retrieved_at DESC);
ALTER TABLE knowledge_usage ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE knowledge_usage FROM anon,authenticated;
