import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, AlertCircle, CheckCircle, Upload } from "lucide-react"

const activities = [
  {
    icon: CheckCircle,
    iconColor: "text-green-600",
    title: "Pricing analysis complete",
    description: "Bakken Unit 14-22 audit",
    time: "2 hours ago",
  },
  {
    icon: FileText,
    iconColor: "text-accent",
    title: "New document uploaded",
    description: "Q3 2024 royalty statement",
    time: "4 hours ago",
  },
  {
    icon: AlertCircle,
    iconColor: "text-amber-600",
    title: "Discrepancy identified",
    description: "$12,450 production variance",
    time: "1 day ago",
  },
  {
    icon: Upload,
    iconColor: "text-muted-foreground",
    title: "Run tickets received",
    description: "September 2024 batch",
    time: "2 days ago",
  },
  {
    icon: CheckCircle,
    iconColor: "text-green-600",
    title: "Audit report delivered",
    description: "Williston Basin review",
    time: "3 days ago",
  },
  {
    icon: FileText,
    iconColor: "text-accent",
    title: "Division order reviewed",
    description: "Green River Tract 7",
    time: "5 days ago",
  },
]

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
