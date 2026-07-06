// Client for the portal's own API routes (app/api/audits/*), backed by Neon.

export const MAX_FILE_BYTES = 4 * 1024 * 1024 // matches the server-side cap

export interface AuditSubmitResponse {
  audit_id: string
  status: string
  message: string
}

export interface AuditStatusResponse {
  audit_id: string
  status: "pending" | "running" | "completed" | "failed"
  owner_name: string
  started_at: string
  completed_at: string | null
  total_expected: number | null
  total_received: number | null
  total_gap: number | null
  gap_pct: number | null
  error_message: string | null
}

export interface AuditReportResponse {
  audit_id: string
  owner_name: string
  report_markdown: string
}

export interface GapResultItem {
  well_api: string
  lease_name: string
  operator: string
  production_month: string
  expected_payment: number
  actual_payment: number
  gap: number
  flags: string[]
}

export interface AuditListItem {
  id: string
  reference: string
  owner_name: string
  state: string
  status: AuditStatusResponse["status"]
  started_at: string
  completed_at: string | null
  total_gap: number | null
  document_count: number
}

async function apiError(res: Response, fallback: string): Promise<Error> {
  const body = await res.json().catch(() => null)
  return new Error(body?.detail || `${fallback}: ${res.status}`)
}

export interface SubmitAuditInput {
  owner_name: string
  owner_email?: string
  state: string
  files: File[]
}

/**
 * Two-phase submission: create the audit, then upload files one per request
 * (Vercel caps request bodies at ~4.5MB). `onProgress` fires after each file.
 */
export async function submitAudit(
  input: SubmitAuditInput,
  onProgress?: (uploaded: number, total: number) => void,
): Promise<AuditSubmitResponse> {
  const res = await fetch("/api/audits", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      owner_name: input.owner_name,
      owner_email: input.owner_email || "",
      state: input.state,
    }),
  })
  if (!res.ok) throw await apiError(res, "Submit failed")
  const created: AuditSubmitResponse = await res.json()

  let uploaded = 0
  for (const file of input.files) {
    const formData = new FormData()
    formData.append("file", file)
    const upload = await fetch(`/api/audits/${created.audit_id}/documents`, {
      method: "POST",
      body: formData,
    })
    if (!upload.ok) {
      const cause = await apiError(upload, "Upload failed")
      throw new Error(
        `Audit ${created.audit_id} was created, but uploading "${file.name}" failed (${cause.message}). ` +
          `Please contact us before resubmitting to avoid a duplicate audit.`,
      )
    }
    uploaded += 1
    onProgress?.(uploaded, input.files.length)
  }

  return created
}

export async function listAudits(): Promise<AuditListItem[]> {
  const res = await fetch("/api/audits")
  if (!res.ok) throw await apiError(res, "List failed")
  return res.json()
}

export async function getAuditStatus(auditId: string): Promise<AuditStatusResponse> {
  const res = await fetch(`/api/audits/${auditId}`)
  if (!res.ok) throw await apiError(res, "Status check failed")
  return res.json()
}

export async function getAuditReport(auditId: string): Promise<AuditReportResponse> {
  const res = await fetch(`/api/audits/${auditId}/report`)
  if (!res.ok) throw await apiError(res, "Report fetch failed")
  return res.json()
}

export async function getAuditGaps(auditId: string): Promise<GapResultItem[]> {
  const res = await fetch(`/api/audits/${auditId}/gaps`)
  if (!res.ok) throw await apiError(res, "Gaps fetch failed")
  return res.json()
}
