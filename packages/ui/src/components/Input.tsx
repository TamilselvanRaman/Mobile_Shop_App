"use client";

import React from "react";

export interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({ label, error, icon, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-semibold text-slate-700">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`w-full rounded-md border text-sm transition-all outline-none 
            ${icon ? "pl-10 pr-4" : "px-4"} py-2.5
            ${
              error
                ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200 dark:bg-red-900/20 dark:border-red-500/50"
                : "border-slate-300 bg-white focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:bg-slate-950 dark:border-slate-800 dark:text-white dark:focus:ring-primary-900"
            } 
            placeholder:text-slate-400 disabled:opacity-50 disabled:bg-slate-50
            ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-600 font-medium">{error}</span>}
    </div>
  );
}
