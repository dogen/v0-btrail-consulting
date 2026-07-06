import { NextResponse } from "next/server"
import { z } from "zod"
import { sql } from "@/lib/db"

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!z.string().uuid().safeParse(id).success) {
    return NextResponse.json({ detail: "Audit not found" }, { status: 404 })
  }

  const [audit] = await sql`
    SELECT id AS audit_id, status, owner_name, started_at, completed_at,
           total_expected::float8 AS total_expected,
           total_received::float8 AS total_received,
           total_gap::float8 AS total_gap,
           gap_pct::float8 AS gap_pct,
           error_message
    FROM audits WHERE id = ${id}
  `
  if (!audit) {
    return NextResponse.json({ detail: "Audit not found" }, { status: 404 })
  }
  return NextResponse.json(audit)
}
