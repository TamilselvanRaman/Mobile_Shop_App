"use client";

import { Container } from "@mobile-shop/ui";
import { Zap, ShieldCheck, Clock, Headphones, Smartphone, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Premium Devices",
    description: "Curated selection of the world's most advanced smartphones and tech.",
    icon: Smartphone,
    color: "bg-blue-500",
  },
  {
    title: "Expert Repairs",
    description: "Master-level technicians restoring your devices to perfection.",
    icon: Zap,
    color: "bg-amber-500",
  },
  {
    title: "Bespoke Services",
    description: "Warranty-backed solutions tailored to your digital lifestyle.",
    icon: ShieldCheck,
    color: "bg-emerald-500",
  },
];

export function Features() {
  return (
    <section className="py-32 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary-500/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-500/5 blur-[100px] rounded-full" />

      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <Sparkles size={12} className="text-primary-600" />
                    Our Excellence
                </div>
                <h2 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
                    Engineered for <br />
                    <span className="text-gradient">Distinction.</span>
                </h2>
            </div>
            <p className="max-w-md text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                We don&apos;t just sell products; we deliver a premium standard of mobile excellence that redefines your tech experience.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group p-8 rounded-[3rem] bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/5 hover:border-primary-500/30"
            >
              <div className={`w-16 h-16 rounded-[1.5rem] ${feature.color} text-white flex items-center justify-center mb-8 shadow-xl`}>
                <feature.icon size={28} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
