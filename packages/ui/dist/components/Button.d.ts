import React from "react";
export interface ButtonProps extends React.ComponentProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
}
export declare function Button({ children, className, variant, size, isLoading, leftIcon, disabled, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
