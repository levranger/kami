import type { BookingStep } from "../types/booking";
import { STEP_NAMES } from "../types/booking";

interface ProgressIndicatorProps {
  currentStep: BookingStep;
}

const TOTAL_STEPS = 2;

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const progress = (currentStep / TOTAL_STEPS) * 100;

  return (
    <div
      className="w-full"
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={TOTAL_STEPS}
      aria-label={`Step ${currentStep} of ${TOTAL_STEPS} — ${STEP_NAMES[currentStep]}`}
    >
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="font-inter text-xs font-medium text-[#1A1A1A]">
          Step {currentStep} of {TOTAL_STEPS}
        </span>
        <span className="font-inter text-xs text-warm-gray">
          {STEP_NAMES[currentStep]}
        </span>
      </div>

      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gold rounded-full progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between mt-2 px-1">
        {([1, 2] as BookingStep[]).map((step) => (
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
