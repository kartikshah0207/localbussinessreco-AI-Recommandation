import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../ui/card";

interface OnboardingLayoutProps {
  stepLabel: string;
  title: string;
  description: string;
  progress: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export function OnboardingLayout({
  stepLabel,
  title,
  description,
  progress,
  children,
  footer
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-2xl px-4 py-10">
        <Card className="rounded-2xl border-border/80 shadow-lg shadow-slate-900/10">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{stepLabel}</span>
              {progress}
            </div>
            <div className="space-y-2">
              <CardTitle className="text-xl sm:text-2xl">
                {title}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                {description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="min-h-[180px] sm:min-h-[220px] transition-all">
              {children}
            </div>
            {footer && (
              <div className="pt-2">
                {footer}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

