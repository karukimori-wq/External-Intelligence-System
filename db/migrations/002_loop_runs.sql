CREATE TABLE loop_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), workspace_id text NOT NULL, project_id text NOT NULL,
  repository text, runtime text NOT NULL, task_id text, status text NOT NULL DEFAULT 'running',
  iteration_count integer NOT NULL DEFAULT 0, no_progress_count integer NOT NULL DEFAULT 0,
  repeated_failure_count integer NOT NULL DEFAULT 0, stop_reason text, trace_id text,
  started_at timestamptz NOT NULL DEFAULT now(), completed_at timestamptz, metadata jsonb NOT NULL DEFAULT '{}'::jsonb
);
CREATE TABLE loop_events (
  id bigserial PRIMARY KEY, loop_run_id uuid NOT NULL REFERENCES loop_runs(id) ON DELETE CASCADE,
  event_name text NOT NULL, iteration integer, progress_fingerprint text, failure_fingerprint text,
  experience_id uuid REFERENCES experiences(id) ON DELETE SET NULL, payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  occurred_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX loop_runs_scope_idx ON loop_runs(workspace_id,project_id,started_at DESC);
CREATE INDEX loop_events_run_idx ON loop_events(loop_run_id,occurred_at);
CREATE INDEX loop_events_failure_idx ON loop_events(loop_run_id,failure_fingerprint) WHERE failure_fingerprint IS NOT NULL;
