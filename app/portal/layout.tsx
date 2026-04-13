import { PortalSidebar } from "@/components/portal/sidebar"
import { PortalHeader } from "@/components/portal/header"

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <PortalSidebar />
      <div className="lg:pl-64">
        <PortalHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
