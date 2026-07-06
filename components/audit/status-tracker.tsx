"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, XCircle, Clock } from "lucide-react"
import { getAuditStatus, type AuditStatusResponse } from "@/lib/audit-api"

const statusConfig = {
  pending: { label: "Pending", icon: Clock, color: "text-muted-foreground" },
  running: { label: "Processing", icon: Loader2, color: "text-accent" },
  completed: { label: "Complete", icon: CheckCircle, color: "text-green-600" },
  failed: { label: "Failed", icon: XCircle, color: "text-destructive" },
}

interface StatusTrackerProps {
  auditId: string
  onComplete: (data: AuditStatusResponse) => void
}

export function StatusTracker({ auditId, onComplete }: StatusTrackerProps) {
  const [status, setStatus] = useState<AuditStatusResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    let cancelled = false

    const poll = async () => {
      try {
        const data = await getAuditStatus(auditId)
        if (cancelled) return
        setStatus(data)

        if (data.status === "completed" || data.status === "failed") {
          if (data.status === "completed") {
            onComplete(data)
          }
          return
        }
        // Pending audits sit in a review queue — poll gently. Running ones
        // are actively being analyzed, so check more often.
        timeout = setTimeout(poll, data.status === "pending" ? 30000 : 5000)
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : "Failed to check status")
      }
    }

    poll()

    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [auditId, onComplete])

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-destructive">
            <XCircle className="w-5 h-5" />
            <p className="text-sm">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!status) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Connecting...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const config = statusConfig[status.status]
  const Icon = config.icon

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon
                className={`w-5 h-5 ${config.color} ${
                  status.status === "running" ? "animate-spin" : ""
                }`}
              />
              <div>
                <p className="font-medium text-foreground">{config.label}</p>
                <p className="text-xs text-muted-foreground font-mono">{auditId}</p>
              </div>
            </div>
            <Badge variant={status.status === "completed" ? "default" : "secondary"}>
              {config.label}
            </Badge>
          </div>

          {status.status === "pending" && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Received — your documents are in the review queue. An analyst will begin the
                gap analysis shortly; we&apos;ll email you when your report is ready. You can
                close this page and check back anytime.
              </p>
            </div>
          )}

          {status.status === "running" && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Analysis in progress — your documents are being cross-referenced against state
                production records.
              </p>
              <div className="mt-3 w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full animate-pulse" style={{ width: "60%" }} />
              </div>
            </div>
          )}

          {status.status === "completed" && status.total_gap !== null && (
            <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">Expected</p>
                <p className="font-semibold font-mono">${status.total_expected?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Received</p>
                <p className="font-semibold font-mono">${status.total_received?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Gap</p>
                <p className="font-semibold font-mono text-accent">
                  ${status.total_gap?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  {status.gap_pct ? ` (${status.gap_pct.toFixed(1)}%)` : ""}
                </p>
              </div>
            </div>
          )}

          {status.status === "failed" && status.error_message && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{status.error_message}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
