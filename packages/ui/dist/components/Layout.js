"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = Container;
exports.Grid = Grid;
exports.Section = Section;
const jsx_runtime_1 = require("react/jsx-runtime");
function Container({ children, className = "" }) {
    return (0, jsx_runtime_1.jsx)("div", { className: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${className}`, children: children });
}
function Grid({ children, className = "" }) {
    return (0, jsx_runtime_1.jsx)("div", { className: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`, children: children });
}
function Section({ children, className = "" }) {
    return (0, jsx_runtime_1.jsx)("section", { className: `py-12 ${className}`, children: children });
}
