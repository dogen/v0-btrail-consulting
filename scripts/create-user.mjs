// Create a portal user. Public sign-up is disabled in the app (lib/auth.ts),
// so accounts are provisioned here instead.
// Usage: npm run user:create -- --email client@example.com --name "Client Name" [--password <pw>]
// Omit --password to have one generated and printed.
import { betterAuth } from "better-auth"
import { Pool } from "pg"
import { parseArgs } from "node:util"
import { randomBytes } from "node:crypto"

const { values } = parseArgs({
  options: {
    email: { type: "string" },
    name: { type: "string" },
    password: { type: "string" },
  },
})

if (!values.email || !values.name) {
  console.error('Usage: npm run user:create -- --email client@example.com --name "Client Name" [--password <pw>]')
  process.exit(1)
}
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Run via: npm run user:create -- ...")
  process.exit(1)
}

const generated = !values.password
const password = values.password ?? randomBytes(12).toString("base64url")

// Same database and secret as lib/auth.ts, but with sign-up enabled so this
// script can create accounts. Password hashing (scrypt) matches the app.
const auth = betterAuth({
  database: new Pool({ connectionString: process.env.DATABASE_URL, max: 1 }),
  emailAndPassword: { enabled: true },
})

try {
  await auth.api.signUpEmail({
    body: { email: values.email, name: values.name, password },
  })
} catch (err) {
  console.error(`Failed to create ${values.email}: ${err?.body?.message ?? err.message}`)
  process.exit(1)
}

console.log(`Created user ${values.name} <${values.email}>`)
if (generated) console.log(`Generated password: ${password}`)
process.exit(0)
