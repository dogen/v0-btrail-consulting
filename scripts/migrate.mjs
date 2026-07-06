// Apply scripts/schema.sql to the Neon database.
// Usage: node --env-file=.env.local scripts/migrate.mjs
import { neon } from "@neondatabase/serverless"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Run with: node --env-file=.env.local scripts/migrate.mjs")
  process.exit(1)
}

const sql = neon(process.env.DATABASE_URL)
const schemaPath = join(dirname(fileURLToPath(import.meta.url)), "schema.sql")

// The HTTP driver runs one statement per call; schema.sql avoids dollar-quoting
// so splitting on trailing semicolons is safe.
const statements = readFileSync(schemaPath, "utf8")
  .split(/;\s*(?:\n|$)/)
  .map((s) => s.trim())
  .filter(Boolean)

for (const statement of statements) {
  await sql.query(statement)
}

const tables = await sql`
  SELECT table_name FROM information_schema.tables
  WHERE table_schema = 'public' ORDER BY table_name
`
console.log(`Applied ${statements.length} statements. Tables: ${tables.map((t) => t.table_name).join(", ")}`)
