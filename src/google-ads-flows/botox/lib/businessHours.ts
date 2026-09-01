// Staffed phone hours: Mon–Sat 9am–8pm Eastern, closed Sunday.
// Mirrors the hours published in the Footer/FAQ and the LHR funnel — kept as a
// local check (no network round trip) so the call button can react instantly.
export function isStaffedHours(now: Date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    hourCycle: "h23",
    weekday: "short",
  }).formatToParts(now);

  const hour = Number(parts.find((p) => p.type === "hour")?.value);
  const weekday = parts.find((p) => p.type === "weekday")?.value;

  if (weekday === "Sun") return false;
  return hour >= 9 && hour < 20;
}
