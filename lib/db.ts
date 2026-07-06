import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

// HTTP-based SQL client — one round trip per query, ideal for serverless.
// Usage: const rows = await sql`SELECT * FROM audits WHERE id = ${id}`
export const sql = neon(process.env.DATABASE_URL)
