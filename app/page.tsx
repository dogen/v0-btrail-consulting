import { Header } from "@/components/marketing/header"
import { HeroSection } from "@/components/marketing/hero-section"
import { ServicesSection } from "@/components/marketing/services-section"
import { FormationsSection } from "@/components/marketing/formations-section"
import { ProcessSection } from "@/components/marketing/process-section"
import { ContactSection } from "@/components/marketing/contact-section"
import { Footer } from "@/components/marketing/footer"

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <FormationsSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
