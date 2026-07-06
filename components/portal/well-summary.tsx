import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowRight, MapPin } from "lucide-react"
import { sql } from "@/lib/db"

export async function WellSummary() {
  const wells = await sql`
    SELECT api, name, formation, monthly_production_bbl, royalty_rate_pct::float8 AS royalty_rate_pct
    FROM wells
    ORDER BY monthly_production_bbl DESC NULLS LAST
    LIMIT 6
  `

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Well Summary</CardTitle>
        <Link href="/portal/wells">
          <Button variant="ghost" size="sm">
            View All Wells
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {wells.length === 0 ? (
          <div className="py-8 text-center">
            <MapPin className="w-8 h-8 mx-auto mb-3 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              No wells on file yet. Wells appear here once your first audit is underway.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-6 px-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>API Number</TableHead>
                  <TableHead>Well Name</TableHead>
                  <TableHead className="hidden md:table-cell">Formation</TableHead>
                  <TableHead className="text-right">Monthly Prod.</TableHead>
                  <TableHead className="text-right hidden sm:table-cell">Royalty Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wells.map((well) => (
                  <TableRow key={well.api}>
                    <TableCell className="font-mono text-sm">{well.api}</TableCell>
                    <TableCell className="font-medium">{well.name}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {well.formation}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {well.monthly_production_bbl !== null
                        ? `${well.monthly_production_bbl.toLocaleString("en-US")} BBL`
                        : "—"}
                    </TableCell>
                    <TableCell className="text-right font-mono hidden sm:table-cell">
                      {well.royalty_rate_pct !== null ? `${well.royalty_rate_pct.toFixed(2)}%` : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
