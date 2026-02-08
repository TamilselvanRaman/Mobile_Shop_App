import { ReactNode } from "react";
export interface CardProps {
    children: ReactNode;
    className?: string;
    title?: string;
    action?: ReactNode;
    noPadding?: boolean;
}
export declare function Card({ children, className, title, action, noPadding }: CardProps): import("react/jsx-runtime").JSX.Element;
