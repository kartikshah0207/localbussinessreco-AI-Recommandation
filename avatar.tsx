import * as React from "react";

import { cn } from "../../lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
}

export function Avatar({ src, alt, className, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted text-sm font-medium",
        className
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <span className="text-muted-foreground">U</span>
      )}
    </div>
  );
}

