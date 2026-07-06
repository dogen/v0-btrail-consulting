import { Card, CardContent } from "@/components/ui/card"
import { FileText, DollarSign, MapPin, Clock } from "lucide-react"
import { sql } from "@/lib/db"
import { formatCurrency } from "@/lib/format"

export async function DashboardStats() {
  const [row] = await sql`
    SELECT
      count(*) FILTER (WHERE status IN ('pending', 'running'))::int AS active_audits,
      coalesce(sum(total_gap) FILTER (WHERE status = 'completed'), 0)::float8 AS total_recovery,
      (SELECT count(*)::int FROM wells) AS wells_monitored,
      (SELECT count(DISTINCT lease_name)::int FROM gap_results WHERE lease_name <> '') AS leases,
      avg(extract(epoch FROM completed_at - started_at) / 86400)
        FILTER (WHERE status = 'completed')::float8 AS avg_days
    FROM audits
  `

  const stats = [
    {
      label: "Active Audits",
      value: String(row.active_audits),
      description: "In progress",
      icon: FileText,
    },
    {
      label: "Total Recovery",
      value: formatCurrency(row.total_recovery),
      description: "Identified to date",
      icon: DollarSign,
    },
    {
      label: "Wells Monitored",
      value: String(row.wells_monitored),
      description: row.leases > 0 ? `Across ${row.leases} lease${row.leases > 1 ? "s" : ""}` : "Ready to onboard",
      icon: MapPin,
    },
    {
      label: "Avg. Audit Time",
      value: row.avg_days !== null ? `${Math.round(row.avg_days)} days` : "—",
      description: "From start to report",
      icon: Clock,
    },
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </div>
              <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
