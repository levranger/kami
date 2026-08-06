// Staffed phone hours: Mon–Sat 9am–7pm Eastern, closed Sunday.
// Mirrors the hours already published in Footer/FAQ — kept as a local check
// (rather than an API call) so the funnel's call/callback button can react
// instantly with no network round trip.
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
  return hour >= 9 && hour < 19;
}
