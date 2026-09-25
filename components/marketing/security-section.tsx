import { Cpu, CloudOff, FileLock, Lock } from "lucide-react"

const safeguards = [
  {
    icon: Cpu,
    title: "Local model, local hardware",
    description:
      "Analysis is performed by an AI model running entirely on machines we own and control. Your documents are never uploaded to a cloud AI provider or handed to a third-party processor.",
  },
  {
    icon: CloudOff,
    title: "A closed loop by design",
    description:
      "Data moves in one direction: from your records into your audit report. There is no outbound connection anywhere in the pipeline, so there is no path for your data to leave.",
  },
  {
    icon: FileLock,
    title: "Confidential end to end",
    description:
      "Division orders, JIBs, production data, and revenue statements stay between you and us. Findings are delivered directly to you and shared with no one else.",
  },
]

export function SecuritySection() {
  return (
    <section id="security" className="py-20 px-6 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="text-primary-foreground/60 font-medium mb-3 tracking-wide uppercase text-sm">
            Privacy &amp; Security
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-balance">
            Your records never leave our hardware
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            Royalty records are sensitive financial documents, and we treat them that way.
            Our entire audit pipeline runs on a local AI model on our own hardware — no
            cloud APIs, no third-party services, no external calls.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {safeguards.map((safeguard, index) => (
            <div
              key={index}
              className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-8"
            >
              <div className="w-12 h-12 rounded-md bg-primary-foreground/10 flex items-center justify-center mb-6">
                <safeguard.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{safeguard.title}</h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                {safeguard.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-3 rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 px-6 py-5">
          <Lock className="w-5 h-5 flex-shrink-0" />
          <p className="text-lg font-medium text-balance">
            Because the loop is closed, data exfiltration isn&apos;t a policy promise —
            it&apos;s an architectural impossibility.
          </p>
        </div>
      </div>
    </section>
  )
}
