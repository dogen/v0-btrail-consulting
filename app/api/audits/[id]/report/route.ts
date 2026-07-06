import { NextResponse } from "next/server"
import { z } from "zod"
import { sql } from "@/lib/db"

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!z.string().uuid().safeParse(id).success) {
    return NextResponse.json({ detail: "Audit not found" }, { status: 404 })
  }

  const [audit] = await sql`
    SELECT id AS audit_id, owner_name, report_markdown FROM audits WHERE id = ${id}
  `
  if (!audit) {
    return NextResponse.json({ detail: "Audit not found" }, { status: 404 })
  }
  if (!audit.report_markdown) {
    return NextResponse.json({ detail: "Report is not ready yet" }, { status: 404 })
  }
  return NextResponse.json(audit)
}
