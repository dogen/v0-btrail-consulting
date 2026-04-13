import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, TrendingUp } from "lucide-react"

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm">
              Independent Forensic Auditing
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight text-balance mb-6">
              Recover what you&apos;re owed from oil and gas royalties
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
              We specialize in forensic auditing for mineral rights and royalty owners 
              in the Green River and Bakken formations. Our detailed production analysis 
              identifies underpayments and ensures you receive accurate compensation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#contact">
                <Button size="lg" className="w-full sm:w-auto">
                  Request a Free Review
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="#process">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
                <div className="w-12 h-12 rounded-md bg-accent/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Sample Audit Summary</p>
                  <p className="text-sm text-muted-foreground">Bakken Formation, ND</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Reported Production</span>
                  <span className="font-mono text-foreground">142,847 BBL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Verified Production</span>
                  <span className="font-mono text-foreground">158,231 BBL</span>
                </div>
                <div className="h-px bg-border my-4" />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Discrepancy Identified</span>
                  <span className="font-mono text-accent font-semibold">+15,384 BBL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Estimated Recovery</span>
                  <span className="font-mono text-accent font-semibold">$847,620</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span>Average client recovery: 8-15% of total royalties</span>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -z-10 top-4 -right-4 w-full h-full bg-muted rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}
