CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email varchar NOT NULL,
  created_at timestamp NOT NULL DEFAULT (current_timestamp AT TIME ZONE 'utc'),
  updated_at timestamp NOT NULL DEFAULT (current_timestamp AT TIME ZONE 'utc'),
  CONSTRAINT unique_email UNIQUE (email)
);

CREATE INDEX email_idx ON users (email);
