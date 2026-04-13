"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  MapPin,
  BarChart3,
  FileArchive,
  Settings,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react"

const navItems = [
  { href: "/portal", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/audits", label: "Audits", icon: FileText },
  { href: "/portal/wells", label: "Wells & Leases", icon: MapPin },
  { href: "/portal/reports", label: "Reports", icon: BarChart3 },
  { href: "/portal/documents", label: "Documents", icon: FileArchive },
  { href: "/portal/settings", label: "Settings", icon: Settings },
  { href: "/portal/help", label: "Help & Support", icon: HelpCircle },
]

interface PortalMobileNavProps {
  open: boolean
  onClose: () => void
}

export function PortalMobileNav({ open, onClose }: PortalMobileNavProps) {
  const pathname = usePathname()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-foreground/20" onClick={onClose} />
      <div className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" onClick={onClose}>
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-lg">BT</span>
            </div>
            <div>
              <span className="font-semibold text-foreground text-sm">Btrail Revenue</span>
              <span className="text-muted-foreground text-xs block">Client Portal</span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                  isActive
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted w-full">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
