import { CheckCircle, MapPin, FileText, ArrowLeft, X } from "lucide-react";
import { useState } from "react";
import type { TreatmentArea, PackageType, PricingSummary } from "../types/booking";
import { formatCurrency } from "../lib/pricing";
import { formatPhoneUS } from "../lib/phone";

interface ConfirmationPageProps {
  bookingRequestId: string;
  selectedAreas: TreatmentArea[];
  selectedPackage: PackageType;
  selectedDate: string;
  selectedTime: string;
  contactPhone: string;
  pricingSummary: PricingSummary;
  onReturnHome: () => void;
}

const prepGuideItems = [
  {
    heading: "Shave the area 24 hours before",
    body: "Shave — don't wax, thread, or use depilatory creams — 24 hours before your appointment. The laser targets the root, so the hair needs to be present beneath the skin.",
  },
  {
    heading: "Avoid sun exposure for 2 weeks prior",
    body: "Tanned or sunburned skin increases the risk of side effects. Stay out of direct sun and avoid self-tanners for at least 2 weeks before your session.",
  },
  {
    heading: "Skip retinoids and active skincare",
    body: "Stop using retinol, AHAs, BHAs, and any prescription topicals on the treatment area for 5–7 days before your appointment.",
  },
  {
    heading: "Come with clean, product-free skin",
    body: "Arrive with no deodorant, lotion, perfume, or makeup on the treatment area. Clean skin ensures the laser works at full effectiveness.",
  },
  {
    heading: "No waxing or plucking between sessions",
    body: "Between sessions you can shave, but never wax or pluck — removing the root defeats the purpose of the treatment.",
  },
  {
    heading: "Wear comfortable, loose clothing",
    body: "Wear or bring loose-fitting clothing that gives easy access to the treatment area. Tight clothing after a session can cause irritation.",
  },
];

export default function ConfirmationPage({
  bookingRequestId,
  selectedAreas,
  selectedPackage,
  selectedDate,
  selectedTime,
  contactPhone,
  pricingSummary,
  onReturnHome,
}: ConfirmationPageProps) {
  const [showPrepGuide, setShowPrepGuide] = useState(false);

  const packageLabels: Record<PackageType, string> = {
    single: "Single Session",
    four: "4 Sessions",
    six: "6 Sessions",
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const displayHour = hours > 12 ? hours - 12 : hours;
    return `${displayHour}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  return (
    <div className="text-center py-8">
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-500" aria-hidden="true" />
        </div>
      </div>

      {/* Heading */}
      <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">
        Appointment Request Received
      </h2>
      <p className="font-inter text-sm text-warm-gray mb-8 max-w-md mx-auto">
        We&apos;ll contact you shortly to confirm your appointment.
        Your appointment is not finalized until availability and deposit are confirmed.
      </p>

      {/* Booking Details Card */}
      <div className="bg-warm-white border border-warm-border rounded-sm p-6 text-left max-w-md mx-auto mb-8">
        <div className="space-y-4">
          <div>
            <p className="font-inter text-[10px] tracking-wider uppercase text-warm-gray font-semibold">
              Booking Request ID
            </p>
            <p className="font-inter text-sm font-mono text-[#1A1A1A] mt-0.5">
              {bookingRequestId}
            </p>
          </div>

          <div className="h-px bg-warm-border" />

          <div>
            <p className="font-inter text-[10px] tracking-wider uppercase text-warm-gray font-semibold">
              Treatment Areas
            </p>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {selectedAreas.map((area) => (
                <span key={area.id} className="font-inter text-xs bg-white border border-warm-border px-2 py-1 rounded-sm">
                  {area.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="font-inter text-[10px] tracking-wider uppercase text-warm-gray font-semibold">
              Package
            </p>
            <p className="font-inter text-sm text-[#1A1A1A] mt-0.5">
              {packageLabels[selectedPackage]} — {formatCurrency(pricingSummary.packageTotal)}
            </p>
          </div>

          <div>
            <p className="font-inter text-[10px] tracking-wider uppercase text-warm-gray font-semibold">
              Requested Date &amp; Time
            </p>
            <p className="font-inter text-sm text-[#1A1A1A] mt-0.5">
              {formatDate(selectedDate)} at {formatTime(selectedTime)} ET
            </p>
          </div>

          <div>
            <p className="font-inter text-[10px] tracking-wider uppercase text-warm-gray font-semibold">
              Contact
            </p>
            <p className="font-inter text-sm text-[#1A1A1A] mt-0.5">
              {formatPhoneUS(contactPhone)}
            </p>
          </div>

          <div className="h-px bg-warm-border" />

          <p className="font-inter text-xs text-warm-gray italic">
            We&apos;ll text or call you shortly to confirm availability and send the deposit link.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <button
          onClick={() => setShowPrepGuide(true)}
          className="flex-1 flex items-center justify-center gap-2 bg-warm-white border border-warm-border text-[#1A1A1A] font-inter text-sm font-medium py-3.5 rounded-sm hover:border-gold transition-colors min-h-[48px]"
        >
          <FileText className="h-4 w-4" aria-hidden="true" />
          Preparation Guide
        </button>
        <a
          href="https://maps.app.goo.gl/KVmjcmSCnA3Mpfqw8"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-warm-white border border-warm-border text-[#1A1A1A] font-inter text-sm font-medium py-3.5 rounded-sm hover:border-gold transition-colors min-h-[48px]"
        >
          <MapPin className="h-4 w-4" aria-hidden="true" />
          Get Directions
        </a>
      </div>

      <button
        onClick={onReturnHome}
        className="mt-4 inline-flex items-center gap-2 font-inter text-sm text-warm-gray hover:text-gold transition-colors"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Return to Website
      </button>

      {/* Prep Guide Modal */}
      {showPrepGuide && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-4 pb-4 sm:pb-0"
          role="dialog"
          aria-modal="true"
          aria-label="Laser Hair Removal Preparation Guide"
          onClick={(e) => { if (e.target === e.currentTarget) setShowPrepGuide(false); }}
        >
          <div className="bg-white rounded-t-2xl sm:rounded-xl w-full max-w-lg max-h-[85vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
              <div className="text-left">
                <h3 className="font-playfair text-lg font-bold text-[#1A1A1A]">
                  Preparation Guide
                </h3>
                <p className="font-inter text-xs text-warm-gray mt-0.5">
                  Laser Hair Removal
                </p>
              </div>
              <button
                onClick={() => setShowPrepGuide(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close preparation guide"
              >
                <X className="h-4 w-4 text-warm-gray" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto px-6 py-5 space-y-5">
              {prepGuideItems.map((item, idx) => (
                <div key={idx} className="text-left">
                  <p className="font-inter text-sm font-semibold text-[#1A1A1A] mb-1">
                    {idx + 1}. {item.heading}
                  </p>
                  <p className="font-inter text-sm text-warm-gray leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}

              <div className="pt-2 pb-1">
                <p className="font-inter text-xs text-warm-gray italic text-center">
                  Questions? Call or text us at{" "}
                  <a href="tel:+19544697153" className="text-gold hover:underline">
                    (954) 469-7153
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}