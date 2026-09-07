// Currency formatting for the funnel. Pricing is fixed by the offer
// (see lib/offers.ts) — there is no per-area or per-package calculation.

/** Round a currency amount to the nearest whole dollar. */
export function roundCurrency(amount: number): number {
  return Math.round(amount);
}

/** Format a number as a whole-dollar USD string, e.g. "$149". */
export function formatCurrency(amount: number): string {
  return `$${roundCurrency(amount).toLocaleString()}`;
}
