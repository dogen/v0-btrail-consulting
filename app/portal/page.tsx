import { DashboardStats } from "@/components/portal/dashboard-stats"
import { RecentAudits } from "@/components/portal/recent-audits"
import { WellSummary } from "@/components/portal/well-summary"
import { ActivityFeed } from "@/components/portal/activity-feed"

// Live data on every request — never serve a stale prerender
export const dynamic = "force-dynamic"

export default function PortalPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back. Here&apos;s an overview of your audit activity.</p>
      </div>

      <DashboardStats />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RecentAudits />
          <WellSummary />
        </div>
        <div>
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}
