"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = Button;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
function Button({ children, className = "", variant = "primary", size = "md", isLoading = false, leftIcon, disabled, ...props }) {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
    const variants = {
        primary: "bg-primary-900 text-white hover:bg-primary-800 focus:ring-primary-900 border border-transparent shadow-sm",
        secondary: "bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 focus:ring-slate-300 shadow-sm",
        outline: "bg-transparent text-primary-900 border border-primary-900 hover:bg-primary-50",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800",
    };
    const sizes = {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
    };
    return ((0, jsx_runtime_1.jsxs)("button", { className: `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`, disabled: isLoading || disabled, ...props, children: [isLoading && (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), !isLoading && leftIcon && (0, jsx_runtime_1.jsx)("span", { className: "mr-2", children: leftIcon }), children] }));
}
