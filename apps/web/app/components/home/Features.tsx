"use client";

import { MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Smartphone, ShieldCheck, Truck, Cpu, Zap, Star } from "lucide-react";
import { Container } from "@mobile-shop/ui";

export function Features() {
  return (
    <section className="py-24 bg-[#fdfdff] text-slate-900 relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/30 blur-[130px]" />
          <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-100/30 blur-[130px]" />
          <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-cyan-100/30 blur-[100px]" />
      </div>

      <Container className="relative z-10">
        <div className="mb-20 text-center max-w-4xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-[0.2em]"
          >
            Excellence Defined
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black tracking-tight leading-tight"
          >
            The Full <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Color Spectrum.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto font-medium"
          >
            Our core values are as vibrant as our products. We bring color and quality to every interaction.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[340px]">
          {/* Feature 1: Cyan/Blue Theme */}
          <SpotlightCard className="md:col-span-2 group border-blue-50 bg-white/70 backdrop-blur-sm">
             <div className="relative z-10 h-full flex flex-col justify-between p-10">
                <div className="w-16 h-16 rounded-[2rem] bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
                   <Smartphone className="w-8 h-8 text-blue-600 group-hover:text-white" />
                </div>
                <div>
                   <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Vivid Displays</h3>
                   <p className="text-slate-500 text-lg leading-relaxed max-w-md font-medium">
                      Discover devices with industry-leading color accuracy and brightness. From Super Retina to Dynamic AMOLED.
                   </p>
                </div>
                <div className="absolute right-[-10%] bottom-[-10%] opacity-[0.05] group-hover:opacity-[0.15] group-hover:rotate-[15deg] transition-all duration-700">
                    <Smartphone className="w-80 h-80" />
                </div>
             </div>
          </SpotlightCard>

          {/* Feature 2: Purple Theme */}
          <SpotlightCard className="md:row-span-2 group border-purple-50 bg-white/70 backdrop-blur-sm">
             <div className="relative z-10 h-full flex flex-col p-10">
                <div className="w-16 h-16 rounded-[2rem] bg-purple-50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500 shadow-inner">
                   <ShieldCheck className="w-8 h-8 text-purple-600 group-hover:text-white" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-5 tracking-tight">Bulletproof Care</h3>
                <p className="text-slate-500 text-lg leading-relaxed mb-8 font-medium">
                   Our warranty service is as bright as our shop. We cover every pixel and every circuit.
                </p>
                <div className="space-y-4 mt-auto">
                    {[
                        { label: "12-Month Coverage", color: "bg-purple-500" },
                        { label: "OLED Screen Guard", color: "bg-indigo-500" },
                        { label: "Master Technicians", color: "bg-blue-500" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center p-3 rounded-2xl bg-white border border-slate-50 shadow-sm">
                            <div className={`w-2 h-2 rounded-full ${item.color} mr-4`} />
                            <span className="text-sm font-black text-slate-700 uppercase tracking-widest">{item.label}</span>
                        </div>
                    ))}
                </div>
             </div>
          </SpotlightCard>

          {/* Feature 3: Orange/Amber Theme */}
          <SpotlightCard className="group border-amber-50 bg-white/70 backdrop-blur-sm">
             <div className="relative z-10 h-full flex flex-col justify-between p-10">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-inner">
                   <Zap className="w-7 h-7 text-amber-600 group-hover:text-white" />
                </div>
                <div>
                   <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Turbo Ship</h3>
                   <p className="text-slate-500 font-medium">
                      Lightning fast delivery in 24 hours. Insurance included on all parcels.
                   </p>
                </div>
             </div>
          </SpotlightCard>

          {/* Feature 4: Green/Teal Theme */}
          <SpotlightCard className="group border-teal-50 bg-white/70 backdrop-blur-sm">
             <div className="relative z-10 h-full flex flex-col justify-between p-10">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mb-4 group-hover:bg-teal-500 group-hover:text-white transition-all shadow-inner">
                   <Star className="w-7 h-7 text-teal-600 group-hover:text-white" />
                </div>
                <div>
                   <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Super Values</h3>
                   <p className="text-slate-500 font-medium">
                      Trade in your old device and get a colorful discount on the newest gear.
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
      className={`group relative border bg-white overflow-hidden rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-100 ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  );
}
