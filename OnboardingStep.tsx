import { ReactNode } from "react";

interface OnboardingStepProps {
  children: ReactNode;
}

export function OnboardingStep({ children }: OnboardingStepProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {children}
    </div>
  );
}

