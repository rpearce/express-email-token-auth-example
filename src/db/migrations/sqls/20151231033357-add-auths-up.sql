CREATE TABLE IF NOT EXISTS auths (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users,
  created_at timestamp NOT NULL DEFAULT (current_timestamp AT TIME ZONE 'utc')
);

CREATE INDEX user_idx ON auths (user_id);
