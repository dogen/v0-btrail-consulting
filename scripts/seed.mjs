// Seed demo-flagged data so the portal demos well. Re-runnable: demo rows are
// wiped and reinserted each run. `--wipe-demo` wipes without reinserting.
// Usage: node --env-file=.env.local scripts/seed.mjs [--wipe-demo]
import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Run with: node --env-file=.env.local scripts/seed.mjs")
  process.exit(1)
}

const sql = neon(process.env.DATABASE_URL)
const wipeOnly = process.argv.includes("--wipe-demo")

// gap_results and audit_documents cascade from audits
await sql`DELETE FROM activity_events WHERE demo`
await sql`DELETE FROM audits WHERE demo`
await sql`DELETE FROM wells WHERE demo`

if (wipeOnly) {
  console.log("Demo rows wiped.")
  process.exit(0)
}

const REPORT = `# Royalty Gap Analysis — Skarphol Family Trust

**Audit reference:** DEMO-2026-001 · **State:** North Dakota (NDIC) · **Period:** Jan–Jun 2025

## Summary

Cross-referencing six months of royalty statements against NDIC production records
identified **$284,500.00 in underpayment (14.9%)** across four Bakken wells operated
by Continental Resources.

## Findings

1. **Price variance** — Realized oil price on statements averaged $4.12/bbl below
   the posted Clearbrook benchmark for Feb–Apr 2025 with no marketing deduction disclosed.
2. **Missing month** — No royalty payment was received for March 2025 production on
   SMITH 14-22H2 despite 3,714 bbl reported to NDIC.
3. **Deduction creep** — Post-production deductions rose from 4.1% to 9.8% of gross
   over the period without an amended division order.

## Recommended next steps

- Demand letter with itemized exhibit (attached schedule)
- Interest calculation under N.D.C.C. § 47-16-39.1
- Division order review for the SMITH lease

*Demo report — generated for portal demonstration purposes.*`

const [audit1] = await sql`
  INSERT INTO audits (reference, owner_name, owner_email, state, status,
                      started_at, completed_at,
                      total_expected, total_received, total_gap, gap_pct,
                      report_markdown, demo)
  VALUES ('DEMO-2026-001', 'Skarphol Family Trust', 'trust@example.com', 'ND', 'completed',
          now() - interval '40 days', now() - interval '12 days',
          1912450.00, 1627950.00, 284500.00, 14.9,
          ${REPORT}, true)
  RETURNING id
`
const [audit2] = await sql`
  INSERT INTO audits (reference, owner_name, owner_email, state, status, started_at, demo)
  VALUES ('DEMO-2026-002', 'Halvorsen — Green River Tract 7', 'ehalvorsen@example.com', 'CO', 'running',
          now() - interval '20 days', true)
  RETURNING id
`
const [audit3] = await sql`
  INSERT INTO audits (reference, owner_name, owner_email, state, status, started_at, demo)
  VALUES ('DEMO-2026-003', 'Smith Mineral Partners', 'smithminerals@example.com', 'ND', 'pending',
          now() - interval '4 hours', true)
  RETURNING id
`

const gapRows = [
  ["33-105-04521", "SMITH 14-22H", "Continental Resources", "2025-02-01", 98420.5, 84210.25, 14210.25, ["price_variance"]],
  ["33-105-04521", "SMITH 14-22H", "Continental Resources", "2025-03-01", 91230.0, 71830.4, 19399.6, ["price_variance", "deduction_creep"]],
  ["33-105-04522", "SMITH 14-22H2", "Continental Resources", "2025-03-01", 76412.8, 0.0, 76412.8, ["missing_month"]],
  ["33-105-04522", "SMITH 14-22H2", "Continental Resources", "2025-04-01", 72105.15, 61254.3, 10850.85, ["price_variance"]],
  ["33-105-04688", "SKARPHOL 9-4H", "Continental Resources", "2025-05-01", 118940.0, 96412.5, 22527.5, ["deduction_creep"]],
  ["33-105-04689", "SKARPHOL 9-4H2", "Continental Resources", "2025-06-01", 104388.6, 86210.6, 18178.0, ["price_variance", "deduction_creep"]],
]
for (const [api, lease, operator, month, expected, actual, gap, flags] of gapRows) {
  await sql`
    INSERT INTO gap_results (audit_id, well_api, lease_name, operator, production_month,
                             expected_payment, actual_payment, gap, flags)
    VALUES (${audit1.id}, ${api}, ${lease}, ${operator}, ${month}, ${expected}, ${actual}, ${gap}, ${flags})
  `
}

const wells = [
  ["33-105-04521", "SMITH 14-22H", "Bakken", 4521, 18.75],
  ["33-105-04522", "SMITH 14-22H2", "Bakken", 3842, 18.75],
  ["49-037-21045", "GREEN RIVER 7-1", "Green River", 2156, 16.67],
  ["33-105-04688", "SKARPHOL 9-4H", "Three Forks", 2890, 18.75],
  ["33-105-04689", "SKARPHOL 9-4H2", "Three Forks", 2413, 18.75],
]
for (const [api, name, formation, bbl, rate] of wells) {
  await sql`
    INSERT INTO wells (api, name, formation, monthly_production_bbl, royalty_rate_pct, status, demo)
    VALUES (${api}, ${name}, ${formation}, ${bbl}, ${rate}, 'Active', true)
    ON CONFLICT (api) DO NOTHING
  `
}

const events = [
  [audit1.id, "complete", "Audit report delivered", "Skarphol Family Trust — $284,500 recovery identified", "12 days"],
  [audit1.id, "alert", "Discrepancy identified", "Missing March 2025 payment on SMITH 14-22H2 — $76,412", "16 days"],
  [audit2.id, "info", "Pricing analysis started", "Green River Tract 7 — benchmark comparison in progress", "5 days"],
  [audit2.id, "upload", "New document uploaded", "Q1 2025 royalty statement batch", "20 days"],
  [audit3.id, "upload", "New audit submitted", "Smith Mineral Partners — 3 documents received", "4 hours"],
]
for (const [auditId, kind, title, description, ago] of events) {
  await sql`
    INSERT INTO activity_events (audit_id, kind, title, description, created_at, demo)
    VALUES (${auditId}, ${kind}, ${title}, ${description}, now() - ${ago}::interval, true)
  `
}

const counts = await sql`
  SELECT (SELECT count(*) FROM audits WHERE demo)          AS audits,
         (SELECT count(*) FROM gap_results g
            JOIN audits a ON a.id = g.audit_id WHERE a.demo) AS gaps,
         (SELECT count(*) FROM wells WHERE demo)           AS wells,
         (SELECT count(*) FROM activity_events WHERE demo) AS events
`
console.log("Seeded:", counts[0])
