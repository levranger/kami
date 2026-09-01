"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ExternalLink } from "lucide-react";
import type { AttributionData } from "./types/booking";
import { botoxAnalytics } from "./lib/analytics";
import { submitBotoxRequest } from "./lib/bookingApi";
import { isValidUSPhone } from "./lib/phone";
import { botoxOffer, BOTOX_REQUEST_META, formatOfferPrice } from "./lib/botoxOffer";
import { useBotoxRequestState, type RequestStep } from "./hooks/useBotoxRequestState";
import { ProgressIndicator } from "./components/ProgressIndicator";
import { MobileStickyFooter } from "./components/MobileStickyFooter";
import { StickyCallButton } from "./components/StickyCallButton";
import { RequestPreferredTimeStep } from "./components/RequestPreferredTimeStep";
import { RequestContactStep } from "./components/RequestContactStep";
import { RequestSuccess } from "./components/RequestSuccess";

const STEP_LABELS = ["Time", "Contact"];
const STEP_NAMES: Record<RequestStep, string> = { 1: "preferred_time", 2: "contact" };
const LAST_STEP: RequestStep = 2;

interface BotoxRequestFlowProps {
  attribution: AttributionData;
  onExit: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function BotoxRequestFlow({ attribution, onExit }: BotoxRequestFlowProps) {
  const state = useBotoxRequestState();
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [doneDate, setDoneDate] = useState<string | null>(null);
  const [doneTime, setDoneTime] = useState<string | null>(null);

  function validate(step: RequestStep): string[] {
    if (step === 1) {
      const e: string[] = [];
      if (!state.preferredDate) e.push("Please choose a preferred date.");
      if (!state.preferredTime) e.push("Please choose a preferred time window.");
      return e;
    }
    if (step === 2) {
      const e: string[] = [];
      if (!state.contact.firstName.trim()) e.push("First name is required.");
      if (!state.contact.lastName.trim()) e.push("Last name is required.");
      if (!isValidUSPhone(state.contact.phone)) e.push("Please enter a valid 10-digit US phone number.");
      if (!EMAIL_RE.test(state.contact.email.trim().toLowerCase())) e.push("Please enter a valid email address.");
      return e;
    }
    return [];
  }

  async function handleSubmit() {
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(null);

    botoxAnalytics.trackRequestSubmitted({ treatmentArea: null, attribution });

    try {
      const { requestId: id } = await submitBotoxRequest({
        contact: {
          firstName: state.contact.firstName.trim(),
          lastName: state.contact.lastName.trim(),
          phone: state.contact.phone,
          email: state.contact.email.trim().toLowerCase(),
        },
        preferredDate: state.preferredDate!,
        preferredTime: state.preferredTime!,
        treatmentArea: null,
        treatmentAreaLabel: null,
        marketingConsent: state.marketingConsent,
        offer: { pricePerUnit: botoxOffer.pricePerUnit, label: BOTOX_REQUEST_META.offer },
        meta: { ...BOTOX_REQUEST_META },
        attribution,
      });

      setDoneDate(state.preferredDate);
      setDoneTime(state.preferredTime);
      setRequestId(id);
      state.reset();
      botoxAnalytics.trackRequestSuccess(id);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "We couldn't send your request. Please try again.";
      setSubmitError("We couldn't send your request just now — your details are saved. Please try again.");
      botoxAnalytics.trackRequestError(message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleNext() {
    const stepErrors = validate(state.currentStep);
    if (stepErrors.length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors([]);
    botoxAnalytics.trackRequestStepCompleted(state.currentStep, STEP_NAMES[state.currentStep]);
    if (state.currentStep === LAST_STEP) {
      void handleSubmit();
      return;
    }
    state.nextStep();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    setErrors([]);
    setSubmitError(null);
    if (state.currentStep === 1) {
      onExit();
      return;
    }
    state.previousStep();
  }

  // ── Success ──────────────────────────────────────────────────────────────
  if (requestId) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-[840px] px-4 py-10">
          <RequestSuccess requestId={requestId} preferredDate={doneDate} preferredTime={doneTime} />
        </div>
      </div>
    );
  }

  const ctaLabel = state.currentStep === LAST_STEP ? "Request My Appointment" : "Continue";
  const nextDisabled = state.currentStep === 1 && (!state.preferredDate || !state.preferredTime);

  return (
    <div className="min-h-screen bg-slate-50 pb-28 md:pb-10">
      {/* Brand + offer bar — keeps the $10/unit offer present through the flow,
          and gives a persistent way back to the main website. */}
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-[840px] px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => botoxAnalytics.trackMainSiteClicked("request_flow_header")}
              className="text-xs font-medium uppercase tracking-widest text-amber-700 hover:text-amber-800"
              aria-label="Kami Aesthetics — main website (opens in a new tab)"
            >
              Kami Aesthetics
            </Link>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => botoxAnalytics.trackMainSiteClicked("request_flow_header_link")}
              className="inline-flex items-center gap-1 text-xs text-slate-400 underline-offset-2 hover:text-slate-700 hover:underline"
            >
              Main site
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-1 text-center text-sm font-semibold text-slate-800">
            Limited-Time {botoxOffer.productName} — {formatOfferPrice()}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[560px] px-4 py-6">
        <button
          type="button"
          onClick={handleBack}
          className="mb-4 inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800"
        >
          <ChevronLeft className="h-4 w-4" />
          {state.currentStep === 1 ? "Back to page" : "Back"}
        </button>

        <ProgressIndicator currentStep={state.currentStep} steps={STEP_LABELS} />

        {submitError && (
          <div role="alert" aria-live="assertive" className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">{submitError}</p>
            <button onClick={handleSubmit} className="mt-2 text-sm font-medium text-amber-700 underline">
              Try again
            </button>
          </div>
        )}

        {state.currentStep === 1 && (
          <RequestPreferredTimeStep
            preferredDate={state.preferredDate}
            preferredTime={state.preferredTime}
            onDateChange={state.setPreferredDate}
            onTimeChange={state.setPreferredTime}
            errors={errors}
          />
        )}

        {state.currentStep === 2 && (
          <RequestContactStep
            contact={state.contact}
            marketingConsent={state.marketingConsent}
            onContactChange={state.setContact}
            onMarketingConsentChange={state.setMarketingConsent}
            errors={errors}
          />
        )}

        {/* Desktop nav (mobile uses the sticky footer) */}
        <div className="mt-8 hidden gap-3 md:flex">
          <button
            type="button"
            onClick={handleBack}
            className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={submitting || nextDisabled}
            className="flex-1 rounded-lg bg-amber-700 py-3 text-base font-semibold text-white shadow transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Sending…" : ctaLabel}
          </button>
        </div>

        {state.currentStep === LAST_STEP && (
          <p className="mt-3 text-center text-xs leading-relaxed text-slate-500 md:text-left">
            Submitting this request does not confirm your appointment. Our team will contact you shortly to
            confirm availability.
          </p>
        )}
      </div>

      <MobileStickyFooter
        show
        action={{
          ctaLabel,
          onClick: handleNext,
          onBack: handleBack,
          showBack: true,
          loading: submitting,
          disabled: nextDisabled,
        }}
      />

      <StickyCallButton location="request_flow" liftForStickyFooter />
    </div>
  );
}
