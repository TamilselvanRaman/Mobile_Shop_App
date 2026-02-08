import * as React from "react";
export interface LayoutProps {
    children?: React.ReactNode;
    className?: string;
}
export declare function Container({ children, className }: LayoutProps): import("react/jsx-runtime").JSX.Element;
export declare function Grid({ children, className }: LayoutProps): import("react/jsx-runtime").JSX.Element;
export declare function Section({ children, className }: LayoutProps): import("react/jsx-runtime").JSX.Element;
