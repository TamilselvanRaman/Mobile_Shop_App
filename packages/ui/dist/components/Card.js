"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = Card;
const jsx_runtime_1 = require("react/jsx-runtime");
function Card({ children, className = "", title, action, noPadding = false }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: `bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm ${className}`, children: [title && ((0, jsx_runtime_1.jsxs)("div", { className: "px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-base font-semibold text-slate-800 dark:text-slate-100 tracking-tight", children: title }), action && (0, jsx_runtime_1.jsx)("div", { children: action })] })), (0, jsx_runtime_1.jsx)("div", { className: noPadding ? "" : "p-6", children: children })] }));
}
