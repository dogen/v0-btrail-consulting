import type React from "react"
import type { Metadata } from "next"
import { Source_Serif_4, IBM_Plex_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const sourceSerif = Source_Serif_4({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-source-serif",
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
})

export const metadata: Metadata = {
  title: "Btrail Revenue Consulting | Oil & Gas Forensic Auditing",
  description:
    "Independent forensic auditing services for oil and gas royalty owners. Specializing in the Green River Formation and Bakken Formation. Recover underpaid royalties with detailed production analysis.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body
        className={`${sourceSerif.variable} ${ibmPlexMono.variable} font-serif antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
