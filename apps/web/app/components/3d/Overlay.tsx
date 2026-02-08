"use client";

import { Scroll } from "@react-three/drei";
import { Button } from "@mobile-shop/ui"; // Adjust import if needed

export function Overlay() {
  return (
    <Scroll html style={{ width: "100%" }}>
      {/* Section 1: Hero */}
      <section className="h-screen w-full flex items-center justify-start px-10 md:px-20 pointer-events-none select-none">
        <div className="max-w-5xl pt-20">
           <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] text-white mix-blend-difference">
             Premium
           </h1>
           <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] text-slate-500 dark:text-slate-600">
             Repairs.
           </h1>
           <p className="text-xl md:text-2xl text-slate-400 mt-8 font-medium max-w-lg tracking-wide">
             Expert technicians. Genuine parts. Restoring your device to perfection.
           </p>
        </div>
      </section>

      {/* Section 2: Services / Vertical Assembly */}
      <section className="h-[200vh] w-full flex items-start justify-center pt-24 pointer-events-none">
        <div className="text-center w-full">
          <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
             Built from the <span className="text-primary-600">Ground Up.</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-lg mx-auto">
             See how we restore your device, one precision layer at a time.
          </p>
        </div>
      </section>

      {/* Section 3: Footer / CTA */}
      <section className="h-screen w-full flex items-center justify-center">
        <div className="text-center bg-white/80 dark:bg-slate-900/80 p-12 rounded-2xl backdrop-blur-lg border border-slate-200 dark:border-slate-800">
           <h2 className="text-4xl font-bold mb-6">Ready to Upgrade?</h2>
           <Button size="lg">Visit Store</Button>
        </div>
      </section>
    </Scroll>
  );
}
