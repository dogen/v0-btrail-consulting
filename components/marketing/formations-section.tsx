import { MapPin, Droplets, Flame } from "lucide-react"

const formations = [
  {
    name: "Bakken Formation",
    location: "North Dakota & Montana",
    description:
      "One of the largest continuous oil accumulations in the United States. Complex horizontal drilling operations and multi-well pad developments create opportunities for production allocation errors and reporting discrepancies.",
    stats: [
      { label: "Active Wells", value: "15,000+" },
      { label: "Daily Production", value: "1.1M BBL" },
      { label: "Primary Product", value: "Light Crude", icon: Droplets },
    ],
  },
  {
    name: "Green River Formation",
    location: "Colorado, Utah & Wyoming",
    description:
      "Contains some of the richest oil shale deposits in the world. The complexity of processing arrangements and varying extraction methods requires careful audit attention to ensure proper royalty accounting.",
    stats: [
      { label: "Estimated Resource", value: "3T BBL" },
      { label: "Basin Area", value: "25,000 mi²" },
      { label: "Primary Product", value: "Oil Shale", icon: Flame },
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
            Deep expertise in key North American basins
          </h2>
          <p className="text-muted-foreground text-lg">
            Our team maintains specialized knowledge of the regulatory environment, 
            operator practices, and common audit findings in these prolific formations.
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
