const steps = [
  {
    number: "01",
    title: "Initial Review",
    description:
      "We begin with a complimentary review of your royalty statements and lease documents to identify potential areas of concern and estimate recovery potential.",
  },
  {
    number: "02",
    title: "Gather the Siloed Records",
    description:
      "Upon engagement, we collect the documents that never talk to each other: division orders, joint interest billings (JIBs), raw production data, and itemized revenue statements — supplemented by state regulatory filings and third-party sources.",
  },
  {
    number: "03",
    title: "Unify the Data",
    description:
      "We normalize every record into a single cross-referenced dataset. Underpayments that are invisible in any one document become obvious when the sources are read side by side.",
  },
  {
    number: "04",
    title: "AI-Native Forensic Analysis",
    description:
      "Our royalty recovery engine — a local AI model running entirely on our own hardware — reconciles reported versus actual production, verifies pricing and deductions, and checks every calculation against your lease terms.",
  },
  {
    number: "05",
    title: "Findings & Recovery",
    description:
      "We deliver a comprehensive audit report documenting each discrepancy with supporting evidence, then assist with operator negotiations and provide expert testimony if needed. Our work product is designed to withstand legal scrutiny.",
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="py-20 px-6 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="text-accent font-medium mb-3 tracking-wide uppercase text-sm">
            Our Process
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 text-balance">
            A methodical approach to royalty recovery
          </h2>
          <p className="text-muted-foreground text-lg">
            Royalty underpayments hide in the gaps between siloed documents. Our
            methodology closes those gaps — bringing every record into one dataset and
            putting an AI-native audit engine to work on it, guided by established
            forensic accounting standards.
          </p>
        </div>

        <div className="space-y-0">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex gap-6 lg:gap-10 py-8 border-b border-border last:border-b-0"
            >
              <div className="flex-shrink-0">
                <span className="text-4xl lg:text-5xl font-semibold text-muted-foreground/40 font-mono">
                  {step.number}
                </span>
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
