import React from "react";
export interface InputProps extends React.ComponentProps<"input"> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}
export declare function Input({ label, error, icon, className, ...props }: InputProps): import("react/jsx-runtime").JSX.Element;
