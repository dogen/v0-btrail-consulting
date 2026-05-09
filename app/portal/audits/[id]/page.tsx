"use client"

import { useState, useCallback } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { StatusTracker } from "@/components/audit/status-tracker"
import { ReportView } from "@/components/audit/report-view"
import type { AuditStatusResponse } from "@/lib/audit-api"

export default function AuditDetailPage() {
  const params = useParams()
  const auditId = params.id as string
  const [completed, setCompleted] = useState(false)

  const handleComplete = useCallback((data: AuditStatusResponse) => {
    setCompleted(true)
  }, [])

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/portal/audits">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Audits
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-foreground">Audit Status</h1>
        <p className="text-muted-foreground font-mono text-sm">{auditId}</p>
      </div>

      <StatusTracker auditId={auditId} onComplete={handleComplete} />

      {completed && <ReportView auditId={auditId} />}
    </div>
  )
}
