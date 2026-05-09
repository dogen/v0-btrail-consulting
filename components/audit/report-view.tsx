"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Printer, Download, Loader2 } from "lucide-react"
import { getAuditReport, type AuditReportResponse } from "@/lib/audit-api"

interface ReportViewProps {
  auditId: string
}

export function ReportView({ auditId }: ReportViewProps) {
  const [report, setReport] = useState<AuditReportResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchReport() {
      try {
        const data = await getAuditReport(auditId)
        setReport(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load report")
      } finally {
        setLoading(false)
      }
    }
    fetchReport()
  }, [auditId])

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 flex items-center justify-center min-h-[200px]">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  if (error || !report) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-destructive">{error || "Report not available"}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Gap Analysis Report</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="w-4 h-4 mr-1" />
            Print
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className="prose-audit font-serif"
          dangerouslySetInnerHTML={{
            __html: markdownToHtml(report.report_markdown),
          }}
        />
      </CardContent>
    </Card>
  )
}

function markdownToHtml(md: string): string {
  // Simple markdown to HTML conversion for the report
  let html = md
    // Headers
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-6 mb-2">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-8 mb-3">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-semibold mt-8 mb-4">$1</h1>')
    // Bold and italic
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr class="my-6 border-border" />')
    // Lists
    .replace(/^- (.*$)/gm, '<li class="ml-4 text-sm">$1</li>')
    // Tables
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(Boolean).map(c => c.trim())
      if (cells.every(c => c.match(/^-+$/))) return ''
      const tag = cells.some(c => c.startsWith('**')) ? 'th' : 'td'
      return '<tr>' + cells.map(c => `<${tag} class="px-3 py-2 text-sm border-b border-border font-mono">${c}</${tag}>`).join('') + '</tr>'
    })
    // Paragraphs
    .replace(/^(?!<[hHlutd])(.*\S.*)$/gm, '<p class="text-sm leading-relaxed mb-3">$1</p>')

  // Wrap table rows
  if (html.includes('<tr>')) {
    html = html.replace(
      /(<tr>[\s\S]*?<\/tr>)/g,
      '<div class="overflow-x-auto my-4"><table class="w-full border-collapse">$1</table></div>'
    )
  }

  return html
}
