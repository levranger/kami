import { botoxOffer, clinicInfo, POLICY_LINKS, formatOfferPrice } from "../lib/botoxOffer";
import { PrimaryOfferCta } from "./PrimaryOfferCta";
import { PromoTerms } from "./PromoTerms";

function PolicyLink({ href, label }: { href: string; label: string }) {
  if (!href) {
    return (
      <span className="text-slate-400">
        {label}
        <span className="ml-1 text-[10px] uppercase tracking-wide">(page pending)</span>
      </span>
    );
  }
  return (
    <a href={href} className="text-slate-500 underline-offset-2 hover:text-slate-800 hover:underline">
      {label}
    </a>
  );
}

/**
 * Bottom-of-page CTA + clinic trust / legal information.
 */
export function ClinicInfo() {
  return (
    <section className="border-t border-slate-100 bg-white px-4 py-14">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Ready when you are
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
          Book your {botoxOffer.productName} treatment at {formatOfferPrice()} and see how
          subtle a refresh can look.
        </p>

        <div className="mt-6 flex justify-center">
          <PrimaryOfferCta placement="page_bottom" />
        </div>

        <PromoTerms variant="compact" className="mt-4" />

        <address className="mt-12 not-italic text-sm leading-relaxed text-slate-600">
          <span className="font-semibold text-slate-800">{clinicInfo.name}</span>
          <br />
          {clinicInfo.addressLine1}
          <br />
          {clinicInfo.addressLine2}
          <br />
          <a href={clinicInfo.phoneHref} className="text-amber-700 hover:underline">
            {clinicInfo.phone}
          </a>
        </address>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs">
          <PolicyLink href={POLICY_LINKS.privacyPolicy} label="Privacy Policy" />
          <span aria-hidden className="text-slate-300">
            ·
          </span>
          <PolicyLink href={POLICY_LINKS.terms} label="Terms" />
          <span aria-hidden className="text-slate-300">
            ·
          </span>
          <PolicyLink
            href={POLICY_LINKS.cancellationDepositPolicy}
            label="Cancellation / Deposit Policy"
          />
        </div>
      </div>
    </section>
  );
}
