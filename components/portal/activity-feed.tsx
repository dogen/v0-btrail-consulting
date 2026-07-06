import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, AlertCircle, CheckCircle, Upload, Activity } from "lucide-react"
import { sql } from "@/lib/db"
import { timeAgo } from "@/lib/format"

const kindConfig = {
  complete: { icon: CheckCircle, iconColor: "text-green-600" },
  upload: { icon: Upload, iconColor: "text-muted-foreground" },
  alert: { icon: AlertCircle, iconColor: "text-amber-600" },
  info: { icon: FileText, iconColor: "text-accent" },
}

export async function ActivityFeed() {
  const activities = await sql`
    SELECT id, kind, title, description, created_at
    FROM activity_events
    ORDER BY created_at DESC
    LIMIT 6
  `

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="py-8 text-center">
            <Activity className="w-8 h-8 mx-auto mb-3 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">No activity yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const config = kindConfig[activity.kind as keyof typeof kindConfig] ?? kindConfig.info
              const Icon = config.icon
              return (
                <div key={activity.id} className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <Icon className={`w-5 h-5 ${config.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{timeAgo(activity.created_at)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
