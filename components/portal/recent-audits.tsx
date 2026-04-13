import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const audits = [
  {
    id: "AUD-2024-001",
    name: "Bakken Unit 14-22",
    operator: "Continental Resources",
    status: "in-progress",
    progress: 75,
    potentialRecovery: "$284,500",
    lastUpdate: "2 days ago",
  },
  {
    id: "AUD-2024-002",
    name: "Green River Tract 7",
    operator: "EOG Resources",
    status: "review",
    progress: 95,
    potentialRecovery: "$156,200",
    lastUpdate: "1 day ago",
  },
  {
    id: "AUD-2024-003",
    name: "Williston Basin - Smith",
    operator: "Hess Corporation",
    status: "in-progress",
    progress: 40,
    potentialRecovery: "$92,800",
    lastUpdate: "4 hours ago",
  },
]

const statusConfig = {
  "in-progress": { label: "In Progress", variant: "secondary" as const },
  review: { label: "Under Review", variant: "default" as const },
  complete: { label: "Complete", variant: "outline" as const },
}

export function RecentAudits() {
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
        <div className="space-y-4">
          {audits.map((audit) => (
            <div
              key={audit.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{audit.id}</span>
                  <Badge variant={statusConfig[audit.status as keyof typeof statusConfig].variant}>
                    {statusConfig[audit.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
                <p className="font-medium text-foreground">{audit.name}</p>
                <p className="text-sm text-muted-foreground">{audit.operator}</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Potential Recovery</p>
                  <p className="font-semibold text-accent font-mono">{audit.potentialRecovery}</p>
                </div>
                <div className="hidden sm:block text-right min-w-[100px]">
                  <p className="text-xs text-muted-foreground">Progress</p>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full"
                        style={{ width: `${audit.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-mono">{audit.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
