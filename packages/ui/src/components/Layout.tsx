import * as React from "react";

export interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: LayoutProps) {
  return <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${className}`}>{children}</div>;
}

export function Grid({ children, className = "" }: LayoutProps) {
  return <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>{children}</div>;
}

export function Section({ children, className = "" }: LayoutProps) {
  return <section className={`py-12 ${className}`}>{children}</section>;
}
