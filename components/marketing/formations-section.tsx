import { MapPin } from "lucide-react"

const formations = [
  {
    name: "Bakken Formation",
    location: "North Dakota & Montana",
    description:
      "Home to an estimated 300,000 private mineral owners who collectively were owed $4.6 billion in royalties in 2023. Since the shale boom began, companies have increasingly passed on infrastructure costs to royalty owners - even on leases signed decades ago that never mentioned deductions. Some owners have seen 20-36% of their royalty income disappear to postproduction costs.",
    stats: [
      { label: "Private Mineral Owners", value: "300,000" },
      { label: "Typical Deductions", value: "20-36%" },
      { label: "State Oversight", value: "None" },
    ],
  },
  {
    name: "Green River Formation",
    location: "Colorado, Utah & Wyoming",
    description:
      "Complex processing arrangements and varying extraction methods create opportunities for opaque deductions. Like the Bakken, mineral owners here face the challenge of deciphering royalty statements that provide only broad categories - making it nearly impossible to verify whether the costs being passed on are legitimate or properly calculated.",
    stats: [
      { label: "Basin Area", value: "25,000 mi²" },
      { label: "Processing Complexity", value: "High" },
      { label: "Transparency", value: "Limited" },
    ],
  },
]

export function FormationsSection() {
  return (
    <section id="formations" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="text-accent font-medium mb-3 tracking-wide uppercase text-sm">
            Areas of Focus
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 text-balance">
            Where mineral owners need answers
          </h2>
          <p className="text-muted-foreground text-lg">
            In these formations, families who have received royalty checks for generations 
            are now watching significant portions disappear. Many leases were signed when 
            oil was sold at or near the wellhead - long before companies began moving 
            commodities across states and passing those costs back to owners.
          </p>
        </div>

        <div className="space-y-8">
          {formations.map((formation, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg overflow-hidden"
            >
              <div className="p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{formation.location}</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground mb-4">
                      {formation.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed max-w-2xl">
                      {formation.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap lg:flex-col gap-4 lg:gap-6 lg:border-l lg:border-border lg:pl-8">
                    {formation.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="min-w-[120px]">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          {stat.label}
                        </p>
                        <p className="text-xl font-semibold text-foreground font-mono">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
