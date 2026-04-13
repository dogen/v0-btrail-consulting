"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#formations", label: "Formations" },
  { href: "#process", label: "Our Process" },
  { href: "#contact", label: "Contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-lg">BT</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-semibold text-foreground">Btrail Revenue</span>
              <span className="text-muted-foreground text-sm block -mt-1">Consulting</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/portal" className="hidden sm:block">
              <Button variant="outline" size="sm">
                Client Portal
              </Button>
            </Link>
            <Link href="#contact" className="hidden md:block">
              <Button size="sm">Request Consultation</Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Link href="/portal">
                  <Button variant="outline" className="w-full">
                    Client Portal
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button className="w-full">Request Consultation</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
