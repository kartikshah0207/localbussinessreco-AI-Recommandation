import * as React from "react";

import { cn } from "../../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = "button", variant = "primary", asChild, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variantClasses =
      variant === "outline"
        ? "border border-border bg-transparent text-foreground hover:bg-muted focus-visible:ring-border"
        : variant === "ghost"
          ? "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-border"
          : "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary";

    // `asChild` is accepted for API compatibility but not yet changing the rendered element.
    return (
      <button
        type={type}
        className={cn(baseClasses, variantClasses, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

