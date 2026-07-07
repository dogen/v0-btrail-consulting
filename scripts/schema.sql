-- Btrail portal schema. Idempotent: safe to re-run.

CREATE TABLE IF NOT EXISTS audits (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference       text UNIQUE NOT NULL,
  owner_name      text NOT NULL,
  owner_email     text,
  state           text NOT NULL DEFAULT 'ND',
  status          text NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  started_at      timestamptz NOT NULL DEFAULT now(),
  completed_at    timestamptz,
  total_expected  numeric(14,2),
  total_received  numeric(14,2),
  total_gap       numeric(14,2),
  gap_pct         numeric(6,2),
  report_markdown text,
  error_message   text,
  demo            boolean NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS audits_status_idx ON audits (status);
CREATE INDEX IF NOT EXISTS audits_started_at_idx ON audits (started_at DESC);

CREATE TABLE IF NOT EXISTS audit_documents (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id     uuid NOT NULL REFERENCES audits (id) ON DELETE CASCADE,
  filename     text NOT NULL,
  content_type text NOT NULL DEFAULT 'application/pdf',
  size_bytes   integer NOT NULL,
  data         bytea NOT NULL,
  uploaded_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS audit_documents_audit_id_idx ON audit_documents (audit_id);

CREATE TABLE IF NOT EXISTS gap_results (
  id               bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  audit_id         uuid NOT NULL REFERENCES audits (id) ON DELETE CASCADE,
  well_api         text NOT NULL,
  lease_name       text NOT NULL DEFAULT '',
  operator         text NOT NULL DEFAULT '',
  production_month date NOT NULL,
  expected_payment numeric(14,2) NOT NULL DEFAULT 0,
  actual_payment   numeric(14,2) NOT NULL DEFAULT 0,
  gap              numeric(14,2) NOT NULL DEFAULT 0,
  flags            text[] NOT NULL DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS gap_results_audit_id_idx ON gap_results (audit_id);

CREATE TABLE IF NOT EXISTS wells (
  api                    text PRIMARY KEY,
  name                   text NOT NULL,
  formation              text NOT NULL DEFAULT '',
  monthly_production_bbl integer,
  royalty_rate_pct       numeric(6,3),
  status                 text NOT NULL DEFAULT 'Active',
  demo                   boolean NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS activity_events (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  audit_id    uuid REFERENCES audits (id) ON DELETE SET NULL,
  kind        text NOT NULL DEFAULT 'info'
                CHECK (kind IN ('info', 'upload', 'complete', 'alert')),
  title       text NOT NULL,
  description text NOT NULL DEFAULT '',
  created_at  timestamptz NOT NULL DEFAULT now(),
  demo        boolean NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS activity_events_created_at_idx ON activity_events (created_at DESC);

-- Better Auth tables (portal sign-in). Column names are camelCase to match
-- Better Auth's defaults — do not rename.

CREATE TABLE IF NOT EXISTS "user" (
  "id"            text PRIMARY KEY,
  "name"          text NOT NULL,
  "email"         text NOT NULL UNIQUE,
  "emailVerified" boolean NOT NULL DEFAULT false,
  "image"         text,
  "createdAt"     timestamp NOT NULL DEFAULT now(),
  "updatedAt"     timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "session" (
  "id"        text PRIMARY KEY,
  "expiresAt" timestamp NOT NULL,
  "token"     text NOT NULL UNIQUE,
  "createdAt" timestamp NOT NULL DEFAULT now(),
  "updatedAt" timestamp NOT NULL DEFAULT now(),
  "ipAddress" text,
  "userAgent" text,
  "userId"    text NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS session_userId_idx ON "session" ("userId");

CREATE TABLE IF NOT EXISTS "account" (
  "id"                    text PRIMARY KEY,
  "accountId"             text NOT NULL,
  "providerId"            text NOT NULL,
  "userId"                text NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
  "accessToken"           text,
  "refreshToken"          text,
  "idToken"               text,
  "accessTokenExpiresAt"  timestamp,
  "refreshTokenExpiresAt" timestamp,
  "scope"                 text,
  "password"              text,
  "createdAt"             timestamp NOT NULL DEFAULT now(),
  "updatedAt"             timestamp NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS account_userId_idx ON "account" ("userId");

CREATE TABLE IF NOT EXISTS "verification" (
  "id"         text PRIMARY KEY,
  "identifier" text NOT NULL,
  "value"      text NOT NULL,
  "expiresAt"  timestamp NOT NULL,
  "createdAt"  timestamp DEFAULT now(),
  "updatedAt"  timestamp DEFAULT now()
);
