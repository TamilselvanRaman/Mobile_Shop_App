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
        
        <div 
          className="relative w-full flex items-center overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
          }}
        >
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
