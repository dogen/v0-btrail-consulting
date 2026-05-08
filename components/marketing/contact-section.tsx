"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin } from "lucide-react"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-accent font-medium mb-3 tracking-wide uppercase text-sm">
              Get in Touch
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 text-balance">
              You shouldn&apos;t have to guess what&apos;s being taken
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              If you&apos;ve noticed unexplained deductions on your royalty statements - 
              or if the &ldquo;other deductions&rdquo; column suddenly started showing 
              numbers after years of being blank - we can help you understand what&apos;s 
              happening and whether it&apos;s legitimate.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground">contact@btrailrevenue.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-foreground">(701) 555-0142</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Office</p>
                  <p className="text-foreground">Bismarck, North Dakota</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-muted/50 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground italic">
                &ldquo;It&apos;s a matter of fairness. We didn&apos;t get any say in it. 
                They just up and changed it. You feel like you&apos;re being cheated. 
                It&apos;s not right.&rdquo;
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                — North Dakota mineral owner
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Thank you for reaching out
                </h3>
                <p className="text-muted-foreground">
                  We&apos;ll review your information and respond within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="county">County / Formation</Label>
                  <Input
                    id="county"
                    name="county"
                    placeholder="e.g., Williams County, McKenzie County"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Tell us about your situation</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="When did you first notice deductions? How much is being withheld? Have you tried to get answers from the operator?"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Request Free Review"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Your information is kept strictly confidential.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
