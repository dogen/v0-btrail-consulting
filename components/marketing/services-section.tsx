import { Scale, Search, FileCheck, Calculator } from "lucide-react"

const services = [
  {
    icon: Search,
    title: "Deduction Analysis",
    description:
      "We examine every line item on your royalty statements - transportation, processing, gathering, compression, and those vague \"other deductions\" that companies rarely explain.",
  },
  {
    icon: FileCheck,
    title: "Lease Compliance Review",
    description:
      "Many leases signed decades ago promise royalties \"free of cost\" with no mention of postproduction deductions. We determine whether the deductions being taken are actually permitted under your lease terms.",
  },
  {
    icon: Calculator,
    title: "Historical Reconciliation",
    description:
      "Companies often apply retroactive adjustments going back years. We trace the history of your payments to identify when deductions started and quantify your cumulative losses.",
  },
  {
    icon: Scale,
    title: "Recovery Documentation",
    description:
      "We provide comprehensive documentation to support negotiations with operators or, if necessary, legal proceedings. Our work product is designed to withstand scrutiny.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 px-6 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="text-accent font-medium mb-3 tracking-wide uppercase text-sm">
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 text-balance">
            Making sense of what&apos;s being taken from your checks
          </h2>
          <p className="text-muted-foreground text-lg">
            Royalty statements can run hundreds of pages with broad categories that tell you 
            almost nothing. &ldquo;Nothing is clear,&rdquo; as one mineral owner put it. We bring 
            clarity to the confusion and help you understand exactly what&apos;s happening to your money.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-8 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-md bg-accent/10 flex items-center justify-center mb-6">
                <service.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
