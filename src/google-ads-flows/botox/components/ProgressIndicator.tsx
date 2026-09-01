const DEFAULT_STEPS = ["Concerns", "Goal", "Estimate", "Details", "Appointment", "Review"];

interface ProgressIndicatorProps {
  currentStep: number;
  /** Override the step labels (and count). Defaults to the legacy 6-step estimator labels. */
  steps?: string[];
}

export function ProgressIndicator({ currentStep, steps = DEFAULT_STEPS }: ProgressIndicatorProps) {
  const total = steps.length;

  return (
    <div className="mb-6">
      <p className="mb-3 text-center text-sm font-medium text-slate-500">
        Step {currentStep} of {total}
      </p>
      <div className="flex items-center gap-1">
        {steps.map((name, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div key={name} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`h-1.5 w-full rounded-full transition-colors ${
                  isCompleted ? "bg-amber-600" : isActive ? "bg-amber-400" : "bg-slate-200"
                }`}
              />
              <span
                className={`hidden text-xs sm:block ${
                  isActive ? "font-medium text-amber-700" : "text-slate-400"
                }`}
              >
                {name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
