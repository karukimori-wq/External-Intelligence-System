CREATE TABLE IF NOT EXISTS development_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id text NOT NULL,
  project_id text NOT NULL,
  agent_id text NOT NULL,
  client_type text NOT NULL,
  repository text NOT NULL,
  branch text NOT NULL DEFAULT 'main',
  base_commit text,
  last_observed_commit text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','blocked','completed','abandoned')),
  current_task text,
  blocker text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  started_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  closed_at timestamptz
);

CREATE TABLE IF NOT EXISTS project_snapshots (
  workspace_id text NOT NULL,
  project_id text NOT NULL,
  version bigint NOT NULL DEFAULT 1,
  repository text NOT NULL,
  branch text NOT NULL DEFAULT 'main',
  current_task text,
  status text NOT NULL DEFAULT 'developing',
  blocker text,
  head_commit text,
  last_verified_commit text,
  source_session_id uuid REFERENCES development_sessions(id) ON DELETE SET NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (workspace_id, project_id)
);

CREATE TABLE IF NOT EXISTS coordination_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id text NOT NULL,
  project_id text NOT NULL,
  development_session_id uuid REFERENCES development_sessions(id) ON DELETE SET NULL,
  event_type text NOT NULL CHECK (event_type IN ('snapshot_updated','blocker_reported','repository_diverged','session_opened','session_closed')),
  expected_commit text,
  actual_commit text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS development_sessions_project_idx ON development_sessions(workspace_id,project_id,status,updated_at DESC);
CREATE INDEX IF NOT EXISTS coordination_events_project_idx ON coordination_events(workspace_id,project_id,created_at DESC);
