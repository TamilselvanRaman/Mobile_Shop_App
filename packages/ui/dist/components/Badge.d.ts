import React from "react";
export interface BadgeProps extends React.ComponentProps<"div"> {
    variant?: "default" | "secondary" | "destructive" | "outline";
}
export declare function Badge({ className, variant, ...props }: BadgeProps): import("react/jsx-runtime").JSX.Element;
