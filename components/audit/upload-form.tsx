"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, X, Loader2 } from "lucide-react"
import { submitAudit, MAX_FILE_BYTES } from "@/lib/audit-api"

export function AuditUploadForm() {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [ownerName, setOwnerName] = useState("")
  const [ownerEmail, setOwnerEmail] = useState("")
  const [state, setState] = useState("ND")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const addFiles = useCallback((incoming: File[]) => {
    const pdfs = incoming.filter((f) => f.type === "application/pdf")
    if (pdfs.length === 0) {
      setError("Only PDF files are accepted")
      return
    }
    const oversize = pdfs.find((f) => f.size > MAX_FILE_BYTES)
    if (oversize) {
      setError(`${oversize.name} is over the 4MB per-file limit`)
      return
    }
    setFiles((prev) => [...prev, ...pdfs])
    setError(null)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      addFiles(Array.from(e.dataTransfer.files))
    },
    [addFiles]
  )

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files))
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (files.length === 0) {
      setError("Please upload at least one PDF document")
      return
    }
    if (!ownerName.trim()) {
      setError("Owner name is required")
      return
    }

    setIsSubmitting(true)
    setError(null)
    setUploadProgress(null)

    try {
      const result = await submitAudit(
        {
          owner_name: ownerName.trim(),
          owner_email: ownerEmail.trim(),
          state,
          files,
        },
        (uploaded, total) => setUploadProgress(`Uploading ${uploaded}/${total} documents...`)
      )
      router.push(`/portal/audits/${result.audit_id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed")
      setIsSubmitting(false)
      setUploadProgress(null)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Document Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Documents</CardTitle>
            <CardDescription>Upload royalty check stubs, JIBs, division orders, or other O&G documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                isDragging ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
              }`}
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">
                Drop PDF files here or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PDF files up to 4MB each
              </p>
              <input
                id="file-input"
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileInput}
                className="hidden"
              />
            </div>

            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, i) => (
                  <div
                    key={`${file.name}-${i}`}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="text-sm truncate">{file.name}</span>
                      <span className="text-xs text-muted-foreground font-mono shrink-0">
                        {(file.size / 1024).toFixed(0)} KB
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(i)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Owner Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Audit Details</CardTitle>
            <CardDescription>Information about the royalty owner and property location</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="owner-name">Owner Name *</Label>
              <Input
                id="owner-name"
                placeholder="e.g., Diana Skarphol"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="owner-email">Email (optional)</Label>
              <Input
                id="owner-email"
                type="email"
                placeholder="diana@example.com"
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                We&apos;ll send the completed report to this address
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ND">North Dakota (NDIC)</SelectItem>
                  <SelectItem value="TX">Texas (RRC)</SelectItem>
                  <SelectItem value="OK">Oklahoma (OCC)</SelectItem>
                  <SelectItem value="CO">Colorado (COGCC)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <Button type="submit" disabled={isSubmitting || files.length === 0}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {uploadProgress ?? "Submitting..."}
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Submit Audit
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
