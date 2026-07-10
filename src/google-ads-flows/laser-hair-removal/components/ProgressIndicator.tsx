import type { BookingStep } from "../types/booking";
import { STEP_NAMES } from "../types/booking";

interface ProgressIndicatorProps {
  currentStep: BookingStep;
}

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const progress = (currentStep / 5) * 100;

  return (
    <div className="w-full" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={5} aria-label={`Step ${currentStep} of 5: ${STEP_NAMES[currentStep]}`}>
      {/* Step indicator text */}
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="font-inter text-xs font-medium text-[#1A1A1A]">
          Step {currentStep} of 5
        </span>
        <span className="font-inter text-xs text-warm-gray">
          {STEP_NAMES[currentStep]}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gold rounded-full progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step dots */}
      <div className="flex justify-between mt-2 px-1">
        {([1, 2, 3, 4, 5] as BookingStep[]).map((step) => (
          <div
            key={step}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              step <= currentStep ? "bg-gold" : "bg-gray-200"
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}