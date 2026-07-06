import { NextResponse } from "next/server"
import { z } from "zod"
import { sql } from "@/lib/db"

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!z.string().uuid().safeParse(id).success) {
    return NextResponse.json({ detail: "Audit not found" }, { status: 404 })
  }

  const gaps = await sql`
    SELECT well_api, lease_name, operator,
           to_char(production_month, 'YYYY-MM') AS production_month,
           expected_payment::float8 AS expected_payment,
           actual_payment::float8 AS actual_payment,
           gap::float8 AS gap,
           flags
    FROM gap_results
    WHERE audit_id = ${id}
    ORDER BY production_month, well_api
  `
  return NextResponse.json(gaps)
}
