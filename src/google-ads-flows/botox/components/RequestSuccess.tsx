import { CheckCircle } from "lucide-react";
import { PHONE_HREF, PHONE_NUMBER } from "@/data/constants";

interface RequestSuccessProps {
  requestId: string;
  preferredDate: string | null;
  preferredTime: string | null;
}

export function RequestSuccess({ requestId, preferredDate, preferredTime }: RequestSuccessProps) {
  return (
    <div className="mx-auto max-w-md py-6 text-center">
      <div className="mb-4 flex justify-center">
        <CheckCircle className="h-14 w-14 text-green-500" />
      </div>

      <h2 className="mb-2 text-2xl font-bold text-slate-900">Your request is in.</h2>
      <p className="mb-4 text-sm leading-relaxed text-slate-600">
        Thank you! Our team will review your preferred time and contact you shortly to confirm your Botox&reg;
        Cosmetic appointment.
      </p>
      <p className="mb-6 text-sm leading-relaxed text-slate-500">
        Please keep an eye on your phone — we typically confirm appointments by text or call.
      </p>

      {preferredDate && preferredTime && (
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 text-left text-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Preferred time (pending confirmation)</p>
          <p className="mt-1 text-slate-700">
            {new Date(preferredDate + "T12:00:00").toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}{" "}
            — {preferredTime}
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-400">Request ID</p>
          <p className="mt-1 font-mono text-xs text-slate-500">{requestId}</p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <a
          href="/"
          className="rounded-lg bg-amber-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-800"
        >
          Back to Kami Aesthetics
        </a>
        <a
          href={PHONE_HREF}
          className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Call or text {PHONE_NUMBER}
        </a>
      </div>
    </div>
  );
}
