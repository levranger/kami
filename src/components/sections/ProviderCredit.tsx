import Link from "next/link";
import type { ServiceProviderKey } from "@/types";
import { SERVICE_PROVIDERS } from "@/data/serviceProviders";

interface ProviderCreditProps {
  provider: ServiceProviderKey;
}

/**
 * One-line "Performed by ..." attribution, shown near the top of a service
 * page's About section. Names link to the provider's /team page — the
 * visible half of the provider→service connection; buildServiceSchema
 * (src/lib/seo.ts) adds the machine-readable half.
 */
export default function ProviderCredit({ provider }: ProviderCreditProps) {
  const attribution = SERVICE_PROVIDERS[provider];
  if (!attribution) return null;

  const { performer, performerBlurb, medicalDirector } = attribution;

  return (
    <p className="font-inter text-xs text-warm-gray mb-6">
      Performed by{" "}
      <Link href={performer.url} className="text-gold hover:text-gold-dark transition-colors">
        {performer.name}
      </Link>
      , {performerBlurb}
      {medicalDirector && (
        <>
          , under the medical direction of{" "}
          <Link href={medicalDirector.url} className="text-gold hover:text-gold-dark transition-colors">
            {medicalDirector.name}
          </Link>
        </>
      )}
      .
    </p>
  );
}
