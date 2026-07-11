import { Pencil } from "lucide-react";
import type { BookingStep, TreatmentArea, PackageType, ContactInfo, ScreeningFlags, PricingSummary } from "../types/booking";
import { formatCurrency } from "../lib/pricing";
import { formatPhoneUS } from "../lib/phone";
import PriceSummary from "./PriceSummary";

interface ReviewBookingProps {
  selectedAreas: TreatmentArea[];
  selectedPackage: PackageType;
  contactInfo: ContactInfo;
  screeningFlags: ScreeningFlags;
  marketingConsent: boolean;
  selectedDate: string;
  selectedTime: string;
  pricingSummary: PricingSummary;
  onEdit: (step: BookingStep) => void;
}

export default function ReviewBooking({
  selectedAreas,
  selectedPackage,
  contactInfo,
  screeningFlags,
  marketingConsent,
  selectedDate,
  selectedTime,
  pricingSummary,
  onEdit,
}: ReviewBookingProps) {
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

  const screeningRequired = screeningFlags.sensitiveSkin || screeningFlags.recentlyTanned;

  return (
    <div>
      <h2 className="font-playfair text-xl md:text-2xl font-bold text-[#1A1A1A] mb-2">
        Review Your Appointment
      </h2>
      <p className="font-inter text-sm text-warm-gray mb-6">
        Please confirm everything looks correct before submitting.
      </p>

      <div className="space-y-5">
        {/* Treatment Areas */}
        <ReviewSection title="Treatment Areas" onEdit={() => onEdit(1)}>
          <div className="flex flex-wrap gap-2">
            {selectedAreas.map((area) => (
              <span key={area.id} className="font-inter text-sm bg-warm-white border border-warm-border px-3 py-1.5 rounded-sm">
                {area.name}
              </span>
            ))}
          </div>
        </ReviewSection>

        {/* Package */}
        <ReviewSection title="Package" onEdit={() => onEdit(2)}>
          <p className="font-inter text-sm text-[#1A1A1A] font-medium">
            {packageLabels[selectedPackage]} — {pricingSummary.sessionCount} session{pricingSummary.sessionCount > 1 ? "s" : ""}
          </p>
          {pricingSummary.discountPercentage > 0 && (
            <p className="font-inter text-xs text-warm-gray mt-1">
              {formatCurrency(pricingSummary.baseSessionPrice)}/session →{" "}
              <span className="text-green-600 font-medium">
                {formatCurrency(pricingSummary.discountedSessionPrice)}/session
              </span>{" "}
              ({pricingSummary.discountPercentage}% off)
            </p>
          )}
        </ReviewSection>

        {/* Appointment */}
        <ReviewSection title="Appointment" onEdit={() => onEdit(4)}>
          <p className="font-inter text-sm text-[#1A1A1A]">
            {formatDate(selectedDate)}
          </p>
          <p className="font-inter text-sm text-[#1A1A1A]">
            {formatTime(selectedTime)} Eastern Time
          </p>
        </ReviewSection>

        {/* Contact */}
        <ReviewSection title="Contact" onEdit={() => onEdit(3)}>
          <p className="font-inter text-sm text-[#1A1A1A]">{contactInfo.fullName}</p>
          <p className="font-inter text-sm text-warm-gray">{formatPhoneUS(contactInfo.phone)}</p>
          <p className="font-inter text-sm text-warm-gray">{contactInfo.email}</p>
          <div className="flex flex-wrap gap-3 mt-2">
            <span className="font-inter text-xs text-warm-gray">
              New patient: {contactInfo.isNewPatient ? "Yes" : "No"}
            </span>
            {screeningRequired && (
              <span className="font-inter text-xs text-amber-600 font-medium">
                ⚠ Consultation may be required
              </span>
            )}
          </div>
          <p className="font-inter text-xs text-warm-gray mt-1">
            SMS marketing: {marketingConsent ? "Opted in" : "Not opted in"}
          </p>
        </ReviewSection>

        {/* Pricing Summary */}
        <div className="pt-2">
          <PriceSummary summary={pricingSummary} />
        </div>
      </div>
    </div>
  );
}

function ReviewSection({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-gray-200 rounded-sm p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-inter text-xs font-semibold tracking-wider uppercase text-warm-gray">
          {title}
        </h3>
        <button
          onClick={onEdit}
          className="flex items-center gap-1 font-inter text-xs text-gold hover:text-gold-dark transition-colors"
          aria-label={`Edit ${title.toLowerCase()}`}
        >
          <Pencil className="h-3 w-3" aria-hidden="true" />
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}