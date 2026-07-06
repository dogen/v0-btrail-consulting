import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileSearch } from "lucide-react"
import { sql } from "@/lib/db"
import { formatCurrency, timeAgo } from "@/lib/format"

const statusConfig = {
  pending: { label: "Pending Review", variant: "secondary" as const, progress: 10 },
  running: { label: "In Progress", variant: "secondary" as const, progress: 60 },
  completed: { label: "Complete", variant: "default" as const, progress: 100 },
  failed: { label: "Needs Attention", variant: "destructive" as const, progress: 0 },
}

const stateNames: Record<string, string> = {
  ND: "North Dakota",
  TX: "Texas",
  OK: "Oklahoma",
  CO: "Colorado",
}

export async function RecentAudits() {
  const audits = await sql`
    SELECT id, reference, owner_name, state, status,
           total_gap::float8 AS total_gap,
           coalesce(completed_at, started_at) AS last_update
    FROM audits
    ORDER BY started_at DESC
    LIMIT 3
  `

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Audits</CardTitle>
        <Link href="/portal/audits">
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {audits.length === 0 ? (
          <div className="py-8 text-center">
            <FileSearch className="w-8 h-8 mx-auto mb-3 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              No audits yet.{" "}
              <Link href="/portal/audits/new" className="text-accent hover:underline">
                Submit your first audit
              </Link>{" "}
              to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {audits.map((audit) => {
              const config = statusConfig[audit.status as keyof typeof statusConfig]
              return (
                <Link
                  key={audit.id}
                  href={`/portal/audits/${audit.id}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">{audit.reference}</span>
                      <Badge variant={config.variant}>{config.label}</Badge>
                    </div>
                    <p className="font-medium text-foreground">{audit.owner_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {stateNames[audit.state] ?? audit.state} · updated {timeAgo(audit.last_update)}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Potential Recovery</p>
                      <p className="font-semibold text-accent font-mono">
                        {audit.total_gap !== null ? formatCurrency(audit.total_gap) : "TBD"}
                      </p>
                    </div>
                    <div className="hidden sm:block text-right min-w-[100px]">
                      <p className="text-xs text-muted-foreground">Progress</p>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full"
                            style={{ width: `${config.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-mono">{config.progress}%</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
