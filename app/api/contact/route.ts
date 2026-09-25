import { NextResponse } from "next/server"
import { z } from "zod"

const CONTACT_RECIPIENT = "austin@btrail.io"
const AGENTMAIL_INBOX = "btrail@agentmail.to"

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("A valid email is required").max(320),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  formation: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(5000).optional().or(z.literal("")),
  // Honeypot: hidden from humans, bots fill it in.
  company: z.string().optional(),
})

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json(
      { detail: parsed.error.issues[0]?.message ?? "Invalid submission" },
      { status: 400 },
    )
  }
  const { firstName, lastName, email, phone, formation, message, company } = parsed.data

  // Honeypot tripped: report success without sending anything.
  if (company) {
    return NextResponse.json({ ok: true })
  }

  const apiKey = process.env.AGENTMAIL_API_KEY
  if (!apiKey) {
    console.error("AGENTMAIL_API_KEY is not set")
    return NextResponse.json({ detail: "Contact service unavailable" }, { status: 503 })
  }

  const name = `${firstName} ${lastName}`
  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    formation ? `Formation / Basin: ${formation}` : null,
    "",
    message || "(no message)",
  ].filter((line) => line !== null)

  const res = await fetch(
    `https://api.agentmail.to/v0/inboxes/${AGENTMAIL_INBOX}/messages/send`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: [CONTACT_RECIPIENT],
        reply_to: email,
        subject: `btrail.io contact: ${name}`,
        text: lines.join("\n"),
      }),
    },
  )

  if (!res.ok) {
    console.error("AgentMail send failed", res.status, await res.text().catch(() => ""))
    return NextResponse.json({ detail: "Failed to send message" }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
