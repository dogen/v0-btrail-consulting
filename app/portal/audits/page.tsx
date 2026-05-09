import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, FileSearch } from "lucide-react"

export default function AuditsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Audits</h1>
          <p className="text-muted-foreground">
            Submit documents for gap analysis against state production records.
          </p>
        </div>
        <Link href="/portal/audits/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Audit
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-12">
          <div className="text-center">
            <FileSearch className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-medium text-foreground mb-1">No audits yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Submit your first audit to get started. Upload royalty check stubs,
              JIBs, or other O&G documents and we&apos;ll cross-reference them against
              state production data.
            </p>
            <Link href="/portal/audits/new">
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Submit Your First Audit
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
