"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Badge = Badge;
const jsx_runtime_1 = require("react/jsx-runtime");
function Badge({ className = "", variant = "default", ...props }) {
    let variantClasses = "";
    switch (variant) {
        case "default":
            variantClasses = "border-transparent bg-primary-600 text-white hover:bg-primary-700";
            break;
        case "secondary":
            variantClasses = "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-50";
            break;
        case "destructive":
            variantClasses = "border-transparent bg-red-500 text-white hover:bg-red-600";
            break;
        case "outline":
            variantClasses = "text-slate-900 dark:text-slate-50 border border-slate-200 dark:border-slate-800";
            break;
    }
    const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
    return ((0, jsx_runtime_1.jsx)("div", { className: `${baseClasses} ${variantClasses} ${className}`, ...props }));
}
