interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function OnboardingProgress({
  currentStep,
  totalSteps
}: OnboardingProgressProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="flex items-center gap-3 w-40">
      <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-[11px] tabular-nums text-muted-foreground">
        {currentStep}/{totalSteps}
      </span>
    </div>
  );
}

