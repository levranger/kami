import type { ServiceProviderKey } from "@/types";
import { valeriia, VALERIIA_PAGE_URL } from "./team/valeriia";
import { goldberg, GOLDBERG_PAGE_URL } from "./team/goldberg";
import { polshkova, POLSHKOVA_PAGE_URL } from "./team/polshkova";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Service → provider attribution, for the visible "Performed by" credit
 *  line and the service schema's `performer`. Names/URLs are read directly
 *  from the team data files (src/data/team/*.ts) so a service page can never
 *  drift out of sync with what a /team page says about that person.
 * ─────────────────────────────────────────────────────────────────────────────
 *  Mapping confirmed by the business:
 *    "injector"        → Valeriia Tiertyshnikova, APRN, under the medical
 *                         direction of Dr. Paul Goldberg. Covers all
 *                         injectables, PRP, biostimulators, IV therapy, and
 *                         medical weight loss.
 *    "laser-specialist" → Valeriia Polshkova, under the medical direction of
 *                         Dr. Paul Goldberg. Covers laser hair removal only.
 *                         (IPL and ResurFX are "injector" — Valeriia
 *                         Tiertyshnikova, APRN, per the business's correction.)
 */

export interface ServiceProviderPerson {
  name: string;
  url: string;
}

export interface ServiceProviderAttribution {
  /** Who directly performs the treatment — also the schema's primary `performer`. */
  performer: ServiceProviderPerson;
  /** Short role phrase used in the visible credit line, e.g. "our licensed aesthetic injector". */
  performerBlurb: string;
  /** Optional — e.g. the medical director whose oversight the credit line names. */
  medicalDirector?: ServiceProviderPerson;
}

export const SERVICE_PROVIDERS: Record<ServiceProviderKey, ServiceProviderAttribution> = {
  injector: {
    performer: { name: valeriia.name, url: VALERIIA_PAGE_URL },
    performerBlurb: "our licensed aesthetic injector",
    medicalDirector: { name: goldberg.name, url: GOLDBERG_PAGE_URL },
  },
  "laser-specialist": {
    performer: { name: polshkova.name, url: POLSHKOVA_PAGE_URL },
    performerBlurb: "our laser and energy-based treatment specialist",
    medicalDirector: { name: goldberg.name, url: GOLDBERG_PAGE_URL },
  },
};
