export function formatCurrency(amount: number): string {
  if (Math.abs(amount) >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(2)}M`
  }
  return `$${Math.round(amount).toLocaleString("en-US")}`
}

export function timeAgo(input: string | Date): string {
  const then = typeof input === "string" ? new Date(input) : input
  const seconds = Math.max(0, Math.floor((Date.now() - then.getTime()) / 1000))

  const units: [number, string][] = [
    [60 * 60 * 24 * 30, "month"],
    [60 * 60 * 24 * 7, "week"],
    [60 * 60 * 24, "day"],
    [60 * 60, "hour"],
    [60, "minute"],
  ]
  for (const [size, name] of units) {
    const count = Math.floor(seconds / size)
    if (count >= 1) return `${count} ${name}${count > 1 ? "s" : ""} ago`
  }
  return "just now"
}
