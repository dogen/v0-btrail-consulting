import { NextResponse } from "next/server"
import { z } from "zod"
import { sql } from "@/lib/db"

// Vercel serverless caps request bodies at ~4.5MB, so files upload one per
// request and we enforce a 4MB ceiling per file.
const MAX_FILE_BYTES = 4 * 1024 * 1024

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!z.string().uuid().safeParse(id).success) {
    return NextResponse.json({ detail: "Audit not found" }, { status: 404 })
  }

  const [audit] = await sql`SELECT id, reference FROM audits WHERE id = ${id}`
  if (!audit) {
    return NextResponse.json({ detail: "Audit not found" }, { status: 404 })
  }

  const formData = await request.formData().catch(() => null)
  const file = formData?.get("file")
  if (!(file instanceof File)) {
    return NextResponse.json({ detail: "Attach one PDF as the 'file' field" }, { status: 400 })
  }
  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
  if (!isPdf) {
    return NextResponse.json({ detail: `${file.name}: only PDF files are accepted` }, { status: 400 })
  }
  if (file.size === 0 || file.size > MAX_FILE_BYTES) {
    return NextResponse.json(
      { detail: `${file.name}: files must be between 1 byte and 4MB` },
      { status: 400 },
    )
  }

  const bytes = Buffer.from(await file.arrayBuffer())
  const [doc] = await sql`
    INSERT INTO audit_documents (audit_id, filename, content_type, size_bytes, data)
    VALUES (${id}, ${file.name}, 'application/pdf', ${bytes.length}, ${"\\x" + bytes.toString("hex")}::bytea)
    RETURNING id, filename, size_bytes
  `
  await sql`
    INSERT INTO activity_events (audit_id, kind, title, description)
    VALUES (${id}, 'upload', 'Document uploaded', ${`${file.name} — ${audit.reference}`})
  `
  return NextResponse.json({ document_id: doc.id, filename: doc.filename, size_bytes: doc.size_bytes })
}
