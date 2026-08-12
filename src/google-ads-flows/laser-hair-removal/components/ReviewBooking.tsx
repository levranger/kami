import { Pencil } from "lucide-react";
import type { BookingStep, TreatmentArea, ContactInfo, ScreeningFlags, PricingSummary } from "../types/booking";
import { formatCurrency } from "../lib/pricing";
import { formatPhoneUS } from "../lib/phone";
import LocationCard from "./LocationCard";

interface ReviewBookingProps {
  selectedAreas: TreatmentArea[];
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
  contactInfo,
  screeningFlags,
  marketingConsent,
  selectedDate,
  selectedTime,
  pricingSummary,
  onEdit,
}: ReviewBookingProps) {
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
        {/* Treatment Areas — package selection happens in person, so this
            shows the transparent single-session price rather than a
            package total. */}
        <ReviewSection title="Treatment Areas" onEdit={() => onEdit(1)}>
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedAreas.map((area) => (
              <span key={area.id} className="font-inter text-sm bg-warm-white border border-warm-border px-3 py-1.5 rounded-sm">
                {area.name}
              </span>
            ))}
          </div>
          <p className="font-inter text-sm text-[#1A1A1A] font-medium">
            {formatCurrency(pricingSummary.discountedSessionPrice)}/session
          </p>
          <p className="font-inter text-xs text-warm-gray mt-1">
            Multi-session packages and savings are available at your appointment.
          </p>
        </ReviewSection>

        {/* Appointment */}
        <ReviewSection title="Appointment" onEdit={() => onEdit(2)}>
          <p className="font-inter text-sm text-[#1A1A1A]">
            {formatDate(selectedDate)}
          </p>
          <p className="font-inter text-sm text-[#1A1A1A]">
            {formatTime(selectedTime)} Eastern Time
          </p>
        </ReviewSection>

        {/* Location — repeated here so it's the last thing clients see
            before confirming, not just something shown back on Step 3. */}
        <LocationCard trackLocation="step4_review" />

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

        {/* Free-request reassurance */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-sm" role="status">
          <p className="font-inter text-sm text-green-800">
            No payment is required now. This is a free appointment request. Our team will contact
            you to confirm your appointment and discuss any deposit requirements.
          </p>
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