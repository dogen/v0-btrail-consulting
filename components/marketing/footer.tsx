import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 px-6 border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-lg">BT</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">Btrail Revenue</span>
              <span className="text-muted-foreground text-sm block -mt-1">Consulting</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <Link href="#services" className="hover:text-foreground transition-colors">
              Services
            </Link>
            <Link href="#formations" className="hover:text-foreground transition-colors">
              Formations
            </Link>
            <Link href="#process" className="hover:text-foreground transition-colors">
              Our Process
            </Link>
            <Link href="#contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link href="/portal" className="hover:text-foreground transition-colors">
              Client Portal
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} Btrail Revenue Consulting. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
