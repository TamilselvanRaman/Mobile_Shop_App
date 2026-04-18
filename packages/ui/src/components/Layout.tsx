import * as React from "react";

export interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: LayoutProps) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${className}`}>
      {children}
    </div>
  );
}

export function Grid({ children, className = "" }: LayoutProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({ children, className = "" }: LayoutProps) {
  return (
    <section className={`py-10 sm:py-16 lg:py-24 ${className}`}>
      {children}
    </section>
  );
}

