CREATE TABLE pattern_sources (
  pattern_id uuid NOT NULL REFERENCES knowledge_items(id) ON DELETE CASCADE,
  observation_id uuid NOT NULL REFERENCES knowledge_items(id) ON DELETE CASCADE,
  project_id text NOT NULL,
  similarity double precision NOT NULL CHECK (similarity >= 0 AND similarity <= 1),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY(pattern_id, observation_id)
);
CREATE INDEX pattern_sources_observation_idx ON pattern_sources(observation_id);
