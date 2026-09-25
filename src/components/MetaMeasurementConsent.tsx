"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  META_ENABLED, getMetaConsent, hasPrivacySignal, initializeMetaQueue,
  setMetaConsent, revokeMetaMeasurement, type MetaConsent,
} from "@/lib/metaLeadTracking";

/** Only mounted on the selected offer page; no site-wide Pixel installation. */
export default function MetaMeasurementConsent() {
  const [choice, setChoice] = useState<MetaConsent>("unset");
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [privacySignal, setPrivacySignal] = useState(false);
  const [loadSdk, setLoadSdk] = useState(false);

  useEffect(() => {
    if (!META_ENABLED) return;
    const sync = () => {
      const current = getMetaConsent();
      setChoice(current);
      setPrivacySignal(hasPrivacySignal());
      if (current !== "granted") revokeMetaMeasurement();
      setLoadSdk(current === "granted" && initializeMetaQueue());
      setReady(true);
    };
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("focus", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("focus", sync);
      revokeMetaMeasurement();
    };
  }, []);

  if (!META_ENABLED || !ready) return null;

  const choose = (value: "granted" | "denied") => {
    const next = setMetaConsent(value);
    setChoice(next);
    setLoadSdk(next === "granted" && initializeMetaQueue());
    setOpen(false);
  };

  return (
    <>
      {loadSdk && (
        <Script id="kami-meta-measurement" src="https://connect.facebook.net/en_US/fbevents.js" strategy="afterInteractive" />
      )}
      <section aria-label="Optional Meta ad measurement" className="bg-[#F7F4EF] border-b border-[#E7E0D6] font-inter text-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 py-3">
          {choice === "unset" || open ? (
            <>
              <p className="text-sm font-semibold">Optional ad measurement</p>
              <p className="text-xs leading-relaxed mt-1 max-w-2xl">
                If you allow it, Meta receives browser and cookie identifiers and a signal when a request is submitted, to measure our ads.
                We do not include your name, phone, email, treatment details, or requested time in that signal.
                You can request an appointment without allowing this. This choice is separate from promotional texts.
                {" "}<a className="underline" href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy policy</a>.
              </p>
              {privacySignal && <p className="text-xs mt-2">Your browser privacy signal is on, so Meta measurement stays off.</p>}
              <div className="flex flex-wrap gap-3 mt-3">
                <button type="button" onClick={() => choose("denied")} className="border border-[#1A1A1A] rounded-sm px-4 py-2 text-xs min-h-[44px]">Decline</button>
                <button type="button" onClick={() => choose("granted")} disabled={privacySignal} className="border border-[#1A1A1A] rounded-sm px-4 py-2 text-xs min-h-[44px] disabled:opacity-40">Allow Meta measurement</button>
              </div>
            </>
          ) : (
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span>Meta ad measurement: {choice === "granted" ? "allowed" : "off"}</span>
              <button type="button" className="underline min-h-[44px]" onClick={() => setOpen(true)}>Change privacy choice</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
