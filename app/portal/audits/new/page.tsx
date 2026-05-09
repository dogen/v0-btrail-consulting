import { AuditUploadForm } from "@/components/audit/upload-form"

export default function NewAuditPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">New Audit</h1>
        <p className="text-muted-foreground">
          Upload documents and provide owner details to begin a gap analysis.
        </p>
      </div>

      <AuditUploadForm />
    </div>
  )
}
