import { NextResponse } from "next/server"
import { z } from "zod"
import { sql } from "@/lib/db"

const createSchema = z.object({
  owner_name: z.string().trim().min(1, "Owner name is required").max(200),
  owner_email: z.string().trim().email().max(320).optional().or(z.literal("")),
  state: z.enum(["ND", "TX", "OK", "CO"]).default("ND"),
})

export async function POST(request: Request) {
  const parsed = createSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json(
      { detail: parsed.error.issues[0]?.message ?? "Invalid submission" },
      { status: 400 },
    )
  }
  const { owner_name, state } = parsed.data
  const owner_email = parsed.data.owner_email || null

  const year = new Date().getFullYear()

  // Reference numbers are sequential per year; retry on the (unlikely) race.
  for (let attempt = 0; attempt < 3; attempt++) {
    const [{ next }] = await sql`
      SELECT coalesce(max(substring(reference from '(\\d+)$')::int), 0) + 1 AS next
      FROM audits WHERE reference LIKE ${`AUD-${year}-%`}
    `
    const reference = `AUD-${year}-${String(next).padStart(3, "0")}`
    try {
      const [audit] = await sql`
        INSERT INTO audits (reference, owner_name, owner_email, state)
        VALUES (${reference}, ${owner_name}, ${owner_email}, ${state})
        RETURNING id
      `
      await sql`
        INSERT INTO activity_events (audit_id, kind, title, description)
        VALUES (${audit.id}, 'upload', 'New audit submitted', ${`${owner_name} — ${reference}`})
      `
      return NextResponse.json({
        audit_id: audit.id,
        status: "pending",
        message: `Audit ${reference} received and queued for review`,
      })
    } catch (err) {
      const code = (err as { code?: string }).code
      if (code !== "23505") throw err // not a duplicate reference — bubble up
    }
  }
  return NextResponse.json({ detail: "Could not allocate an audit reference, please retry" }, { status: 500 })
}

export async function GET() {
  const audits = await sql`
    SELECT a.id, a.reference, a.owner_name, a.state, a.status,
           a.started_at, a.completed_at, a.total_gap::float8 AS total_gap,
           count(d.id)::int AS document_count
    FROM audits a
    LEFT JOIN audit_documents d ON d.audit_id = a.id
    GROUP BY a.id
    ORDER BY a.started_at DESC
    LIMIT 100
  `
  return NextResponse.json(audits)
}
