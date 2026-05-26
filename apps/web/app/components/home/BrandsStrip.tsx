"use client";

import { motion } from "framer-motion";

const BRANDS = [
  { name: "Apple", label: "" },
  { name: "Samsung", label: "SAMSUNG" },
  { name: "Google", label: "Google" },
  { name: "OnePlus", label: "ONEPLUS" },
  { name: "Xiaomi", label: "mi" },
  { name: "Sony", label: "SONY" },
  { name: "Asus", label: "ASUS" }
];

export function BrandsStrip() {
  // Duplicate for seamless infinite loop
  const duplicatedBrands = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section className="py-10 border-t border-b border-slate-100 bg-slate-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8">
          Authorized Retailer & Service Partner
        </p>
        
        <div className="relative w-full flex items-center">
          {/* Gradient Masks for fade-in/out effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Scrolling track */}
          <motion.div
            className="flex gap-16 sm:gap-24 items-center whitespace-nowrap"
            animate={{
              x: ["0%", "-33.33%"],
            }}
            transition={{
              ease: "linear",
              duration: 20,
              repeat: Infinity,
            }}
          >
            {duplicatedBrands.map((brand, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-slate-400 hover:text-slate-800 transition-colors duration-300 select-none cursor-default group"
              >
                <span className="text-xl sm:text-2xl font-black tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity">
                  {brand.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
