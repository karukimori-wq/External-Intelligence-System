CREATE TABLE embedding_profiles (
  id text PRIMARY KEY,
  provider text NOT NULL,
  model text NOT NULL,
  dimensions integer NOT NULL CHECK(dimensions > 0 AND dimensions <= 4096),
  active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE knowledge_items ADD COLUMN embedding_profile_id text REFERENCES embedding_profiles(id) ON DELETE SET NULL;
CREATE INDEX knowledge_embedding_profile_idx ON knowledge_items(workspace_id,embedding_profile_id) WHERE embedding IS NOT NULL;
ALTER TABLE embedding_profiles ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE embedding_profiles FROM anon,authenticated;
