"use client";

import { useEffect, useRef } from "react";
import { botoxAnalytics } from "../lib/analytics";
import { provider } from "../lib/botoxOffer";

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);
}

/**
 * Provider credibility block — replaces the generic "qualified medical provider"
 * wording with the actual treating provider on file.
 */
export function ProviderCredibility() {
  const sectionRef = useRef<HTMLElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !fired.current) {
            fired.current = true;
            botoxAnalytics.trackProviderViewed();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="border-t border-slate-100 bg-white px-4 py-12">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-left">
        {provider.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={provider.photoUrl}
            alt={`${provider.name}, ${provider.credential}`}
            className="h-20 w-20 shrink-0 rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            aria-hidden
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-amber-50 text-lg font-semibold text-amber-700"
          >
            {initials(provider.name)}
          </div>
        )}

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Treatment performed by
          </p>
          <p className="mt-1 text-base font-bold text-slate-900">
            {provider.name}, {provider.credential}
          </p>
          {provider.licenseNumber && (
            <p className="mt-0.5 text-xs text-slate-500">{provider.licenseNumber}</p>
          )}
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-slate-600">{provider.bio}</p>
          {provider.meetProviderUrl && (
            <a
              href={provider.meetProviderUrl}
              className="mt-2 inline-block text-sm font-medium text-amber-700 hover:underline"
            >
              Meet your provider
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
