const API_URL = process.env.NEXT_PUBLIC_AUDIT_API_URL || "http://localhost:8080"

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

export async function submitAudit(formData: FormData): Promise<AuditSubmitResponse> {
  const res = await fetch(`${API_URL}/api/v1/audits`, {
    method: "POST",
    body: formData,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Submission failed" }))
    throw new Error(err.detail || `Submit failed: ${res.status}`)
  }
  return res.json()
}

export async function getAuditStatus(auditId: string): Promise<AuditStatusResponse> {
  const res = await fetch(`${API_URL}/api/v1/audits/${auditId}`)
  if (!res.ok) {
    throw new Error(`Status check failed: ${res.status}`)
  }
  return res.json()
}

export async function getAuditReport(auditId: string): Promise<AuditReportResponse> {
  const res = await fetch(`${API_URL}/api/v1/audits/${auditId}/report`)
  if (!res.ok) {
    throw new Error(`Report fetch failed: ${res.status}`)
  }
  return res.json()
}

export async function getAuditGaps(auditId: string): Promise<GapResultItem[]> {
  const res = await fetch(`${API_URL}/api/v1/audits/${auditId}/gaps`)
  if (!res.ok) {
    throw new Error(`Gaps fetch failed: ${res.status}`)
  }
  return res.json()
}
