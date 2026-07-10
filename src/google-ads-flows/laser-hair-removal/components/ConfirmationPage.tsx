import { CheckCircle, MapPin, FileText, ArrowLeft } from "lucide-react";
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
  const packageLabels: Record<PackageType, string> = {
    single: "Single Session",
    six: "6 Sessions",
    twelve: "12 Sessions",
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
        <a
          href="#"
          className="flex-1 flex items-center justify-center gap-2 bg-warm-white border border-warm-border text-[#1A1A1A] font-inter text-sm font-medium py-3.5 rounded-sm hover:border-gold transition-colors min-h-[48px]"
        >
          <FileText className="h-4 w-4" aria-hidden="true" />
          Preparation Guide
        </a>
        <a
          href="https://maps.google.com/?q=2999+NE+191st+St+Aventura+FL+33180"
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
    </div>
  );
}