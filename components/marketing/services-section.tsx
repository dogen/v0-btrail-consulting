import { Scale, Search, FileCheck, Calculator } from "lucide-react"

const services = [
  {
    icon: Search,
    title: "Production Verification",
    description:
      "Cross-reference operator-reported volumes against state records, run tickets, and third-party data sources to identify discrepancies.",
  },
  {
    icon: Calculator,
    title: "Pricing Analysis",
    description:
      "Audit posted prices, deductions, and market differentials to ensure royalty calculations align with lease terms and market conditions.",
  },
  {
    icon: FileCheck,
    title: "Lease Compliance Review",
    description:
      "Examine lease agreements for proper application of royalty rates, deduction caps, and calculation methodologies.",
  },
  {
    icon: Scale,
    title: "Recovery Support",
    description:
      "Provide comprehensive documentation and expert analysis to support negotiations or legal proceedings for royalty recovery.",
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
            Comprehensive royalty auditing for mineral owners
          </h2>
          <p className="text-muted-foreground text-lg">
            We apply rigorous accounting standards and deep industry knowledge to ensure 
            you receive every dollar you&apos;re entitled to under your lease agreements.
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
