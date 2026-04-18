"use client";

import { MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Smartphone, ShieldCheck, Truck, Cpu, PenTool, HeadphonesIcon } from "lucide-react";
import { Container } from "@mobile-shop/ui";

export function Features() {
  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px]" />
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[100px]" />
      </div>

      <Container className="relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400"
          >
            Why Choose MobileShop?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400"
          >
            We combine premium products with expert service to define the future of mobile retail.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {/* Feature 1: Large Span */}
          <SpotlightCard className="md:col-span-2 group">
             <div className="relative z-10 h-full flex flex-col justify-between p-8">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                   <Smartphone className="w-7 h-7 text-indigo-400" />
                </div>
                <div>
                   <h3 className="text-2xl font-bold text-white mb-2">Premium Flagships</h3>
                   <p className="text-slate-400 leading-relaxed max-w-md">
                      Experience the latest technology with our curated selection of flagship devices from Apple, Samsung, and Google. Always authentic, always the newest.
                   </p>
                </div>
                {/* Decorative Element */}
                <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Smartphone className="w-64 h-64 -mb-12 -mr-12 rotate-12" />
                </div>
             </div>
          </SpotlightCard>

          {/* Feature 2: Tall */}
          <SpotlightCard className="md:row-span-2 group">
             <div className="relative z-10 h-full flex flex-col p-8">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                   <ShieldCheck className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Certified & Secure</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                   Every device undergoes a 40-point inspection. We offer a comprehensive 12-month warranty on all products and repairs.
                </p>
                <ul className="space-y-3 mt-auto">
                    {[
                        "12-Month Warranty", 
                        "Data Security Guaranteed", 
                        "Original Parts Only",
                        "Certified Technicians"
                    ].map((item, i) => (
                        <li key={i} className="flex items-center text-sm text-slate-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-3" />
                            {item}
                        </li>
                    ))}
                </ul>
             </div>
          </SpotlightCard>

          {/* Feature 3 */}
          <SpotlightCard className="group">
             <div className="relative z-10 h-full flex flex-col justify-between p-8">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                   <Truck className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-white mb-2">Express Delivery</h3>
                   <p className="text-slate-400 text-sm">
                      Free next-day shipping on orders over $500. Fully insured and trackable.
                   </p>
                </div>
             </div>
          </SpotlightCard>

          {/* Feature 4 */}
          <SpotlightCard className="group">
             <div className="relative z-10 h-full flex flex-col justify-between p-8">
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                   <Cpu className="w-6 h-6 text-green-400" />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-white mb-2">Trade-In Value</h3>
                   <p className="text-slate-400 text-sm">
                      Get the best market rates for your old devices when you upgrade with us.
                   </p>
                </div>
             </div>
          </SpotlightCard>
        </div>
      </Container>
    </section>
  );
}

function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-slate-800 bg-slate-900 overflow-hidden rounded-3xl ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  );
}
