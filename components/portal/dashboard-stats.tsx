import { Card, CardContent } from "@/components/ui/card"
import { FileText, DollarSign, MapPin, Clock } from "lucide-react"

const stats = [
  {
    label: "Active Audits",
    value: "3",
    description: "In progress",
    icon: FileText,
  },
  {
    label: "Total Recovery",
    value: "$1.24M",
    description: "Identified to date",
    icon: DollarSign,
  },
  {
    label: "Wells Monitored",
    value: "47",
    description: "Across 12 leases",
    icon: MapPin,
  },
  {
    label: "Avg. Audit Time",
    value: "45 days",
    description: "From start to report",
    icon: Clock,
  },
]

export function DashboardStats() {
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
