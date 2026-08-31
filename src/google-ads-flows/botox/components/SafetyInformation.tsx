import { botoxOffer, BOTOX_SAFETY_LINKS } from "../lib/botoxOffer";

function SafetyLink({ href, label }: { href: string; label: string }) {
  if (!href) {
    return (
      <span className="text-slate-400">
        {label}
        <span className="ml-1 text-[10px] uppercase tracking-wide">(link pending)</span>
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-amber-700 underline-offset-2 hover:underline"
    >
      {label}
    </a>
  );
}

/**
 * Prescription-product safety / fair-balance area.
 *
 * Easy to find and legible, but positioned near the bottom so it does not
 * dominate the hero. Structured so official manufacturer / FDA language and
 * links can be dropped in exactly, without paraphrasing.
 *
 * Uses a native <details> element so the expand/collapse works with zero
 * JavaScript and never produces horizontal overflow.
 *
 * TODO (compliance): Final branded prescription-drug disclosure / fair-balance
 * requirements should be reviewed before paid campaign launch.
 */
export function SafetyInformation() {
  return (
    <section className="border-t border-slate-100 bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          Important Safety Information
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {botoxOffer.productName} is a prescription medicine. It must be assessed and
          administered by an appropriately licensed medical provider. It is not right for
          everyone; your provider will review your health history, medications, and goals
          before any treatment.
        </p>

        <details className="group mt-4 overflow-hidden rounded-lg border border-slate-200 bg-white">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-slate-800 [&::-webkit-details-marker]:hidden">
            <span>Read Important Safety Information</span>
            <span aria-hidden className="text-slate-400 transition group-open:rotate-180">
              ⌄
            </span>
          </summary>
          <div className="space-y-3 border-t border-slate-100 px-4 py-4 text-sm leading-relaxed text-slate-600">
            <p>
              {/*
                TODO (compliance): paste the manufacturer's exact Important Safety
                Information for Botox® Cosmetic here — including the boxed warning
                about distant spread of toxin effect, contraindications, warnings
                and precautions, drug interactions, and the most common adverse
                reactions. Do not paraphrase branded prescription-drug safety text.
              */}
              Complete Important Safety Information for {botoxOffer.productName} — including
              its boxed warning, contraindications, warnings and precautions, and the most
              common side effects — is provided in the official documents below.
            </p>
            <ul className="space-y-2">
              <li>
                <SafetyLink
                  href={BOTOX_SAFETY_LINKS.importantSafetyInformation}
                  label="Important Safety Information"
                />
              </li>
              <li>
                <SafetyLink href={BOTOX_SAFETY_LINKS.medicationGuide} label="Medication Guide" />
              </li>
              <li>
                <SafetyLink
                  href={BOTOX_SAFETY_LINKS.fullPrescribingInformation}
                  label="Full Prescribing Information"
                />
              </li>
            </ul>
          </div>
        </details>

        <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
          BOTOX® and BOTOX® Cosmetic are registered trademarks of their manufacturer and are
          used here for identification purposes only.
        </p>
      </div>
    </section>
  );
}
