const steps = [
  {
    number: "01",
    title: "Initial Review",
    description:
      "Send us your royalty statements and lease documents. We'll identify when deductions started appearing, what categories are being charged, and flag any red flags - at no cost to you.",
  },
  {
    number: "02",
    title: "Lease Analysis",
    description:
      "We examine your lease language carefully. Does it promise royalties \"free of cost\"? Is it silent on postproduction expenses? Many leases signed before the shale boom never contemplated these deductions.",
  },
  {
    number: "03",
    title: "Statement Reconciliation",
    description:
      "We work through your statements line by line, tracing deduction history, identifying retroactive adjustments, and comparing your experience to what other owners are seeing from the same operators.",
  },
  {
    number: "04",
    title: "Findings Report",
    description:
      "We deliver a clear, documented summary of our findings: what's been deducted, whether it appears permitted under your lease, the cumulative impact, and your options for recovery.",
  },
  {
    number: "05",
    title: "Recovery Support",
    description:
      "Whether you pursue direct negotiation with the operator or need to consider legal options, we provide the documentation and analysis to support your case. Litigation is expensive - good evidence is essential.",
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
            Getting answers when operators won&apos;t provide them
          </h2>
          <p className="text-muted-foreground text-lg">
            &ldquo;We are not obligated to mail each owner a calculation as to how their 
            interest was calculated,&rdquo; one company told a mineral owner. When operators 
            won&apos;t explain, we help you find the truth in the numbers.
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
