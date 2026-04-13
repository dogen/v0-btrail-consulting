const steps = [
  {
    number: "01",
    title: "Initial Review",
    description:
      "We begin with a complimentary review of your royalty statements and lease documents to identify potential areas of concern and estimate recovery potential.",
  },
  {
    number: "02",
    title: "Data Collection",
    description:
      "Upon engagement, we gather production records, check stubs, division orders, and operator correspondence. We also obtain state regulatory filings and third-party data.",
  },
  {
    number: "03",
    title: "Forensic Analysis",
    description:
      "Our team performs detailed reconciliation of reported vs. actual production, pricing verification, deduction analysis, and lease term compliance review.",
  },
  {
    number: "04",
    title: "Findings Report",
    description:
      "We deliver a comprehensive audit report documenting discrepancies, quantifying underpayments, and providing supporting evidence for each finding.",
  },
  {
    number: "05",
    title: "Recovery Support",
    description:
      "We assist with operator negotiations and provide expert testimony if needed. Our work product is designed to withstand legal scrutiny.",
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
            Our audit methodology follows established forensic accounting standards 
            and has been refined through years of oil and gas industry experience.
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
