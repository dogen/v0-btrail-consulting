import { betterAuth } from "better-auth"
import { Pool } from "pg"

// Email/password auth backed by the same Neon database as the portal data
// (DATABASE_URL is Neon's pooled connection string, so a tiny pg pool per
// serverless instance is safe). The signing secret comes from AUTH_SECRET —
// better-auth reads it (or BETTER_AUTH_SECRET) from the environment.
//
// Public sign-up is disabled: the portal lists every client's audits, so
// accounts are created by us with `npm run user:create`.
export const auth = betterAuth({
  database: new Pool({ connectionString: process.env.DATABASE_URL, max: 1 }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days, matching the old shared-password cookie
    updateAge: 60 * 60 * 24, // 1 day
  },
  trustedOrigins: [
    "https://btrail-consulting.netlify.app",
    "https://btrail.io",
    "https://www.btrail.io",
  ],
})
