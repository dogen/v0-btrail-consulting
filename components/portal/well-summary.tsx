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
import { ArrowRight } from "lucide-react"

const wells = [
  {
    api: "33-105-04521",
    name: "SMITH 14-22H",
    formation: "Bakken",
    monthlyProduction: "4,521 BBL",
    royaltyRate: "18.75%",
    status: "Active",
  },
  {
    api: "33-105-04522",
    name: "SMITH 14-22H2",
    formation: "Bakken",
    monthlyProduction: "3,842 BBL",
    royaltyRate: "18.75%",
    status: "Active",
  },
  {
    api: "49-037-21045",
    name: "GREEN RIVER 7-1",
    formation: "Green River",
    monthlyProduction: "2,156 BBL",
    royaltyRate: "16.67%",
    status: "Active",
  },
  {
    api: "33-061-01234",
    name: "WILLISTON 8-15",
    formation: "Three Forks",
    monthlyProduction: "1,892 BBL",
    royaltyRate: "20.00%",
    status: "Active",
  },
]

export function WellSummary() {
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
                  <TableCell className="text-right font-mono">{well.monthlyProduction}</TableCell>
                  <TableCell className="text-right font-mono hidden sm:table-cell">
                    {well.royaltyRate}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
