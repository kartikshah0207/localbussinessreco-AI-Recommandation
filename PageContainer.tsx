import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="container flex-1 py-8">
      {children}
    </main>
  );
}

