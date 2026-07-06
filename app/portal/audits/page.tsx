import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, FileSearch } from "lucide-react"
import { sql } from "@/lib/db"
import { formatCurrency, timeAgo } from "@/lib/format"

export const dynamic = "force-dynamic"

const statusConfig = {
  pending: { label: "Pending Review", variant: "secondary" as const },
  running: { label: "In Progress", variant: "secondary" as const },
  completed: { label: "Complete", variant: "default" as const },
  failed: { label: "Needs Attention", variant: "destructive" as const },
}

export default async function AuditsPage() {
  const audits = await sql`
    SELECT a.id, a.reference, a.owner_name, a.state, a.status,
           a.started_at, a.total_gap::float8 AS total_gap,
           count(d.id)::int AS document_count
    FROM audits a
    LEFT JOIN audit_documents d ON d.audit_id = a.id
    GROUP BY a.id
    ORDER BY a.started_at DESC
    LIMIT 100
  `

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

      {audits.length === 0 ? (
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
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto -mx-6 px-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead className="hidden sm:table-cell">State</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right hidden md:table-cell">Documents</TableHead>
                    <TableHead className="text-right">Potential Recovery</TableHead>
                    <TableHead className="text-right hidden md:table-cell">Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {audits.map((audit) => {
                    const config = statusConfig[audit.status as keyof typeof statusConfig]
                    return (
                      <TableRow key={audit.id}>
                        <TableCell className="font-mono text-sm">
                          <Link href={`/portal/audits/${audit.id}`} className="text-accent hover:underline">
                            {audit.reference}
                          </Link>
                        </TableCell>
                        <TableCell className="font-medium">{audit.owner_name}</TableCell>
                        <TableCell className="hidden sm:table-cell text-muted-foreground">{audit.state}</TableCell>
                        <TableCell>
                          <Badge variant={config.variant}>{config.label}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono hidden md:table-cell">
                          {audit.document_count}
                        </TableCell>
                        <TableCell className="text-right font-mono text-accent">
                          {audit.total_gap !== null ? formatCurrency(audit.total_gap) : "TBD"}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground hidden md:table-cell">
                          {timeAgo(audit.started_at)}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
