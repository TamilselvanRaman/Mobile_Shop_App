"use client";

import React, { MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Container } from "@mobile-shop/ui";

const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "iPhone 15 Pro Max Owner",
    quote: "Absolutely seamless experience! Traded in my older device and walked out with a brand-new iPhone in under 20 minutes. Highly professional staff!",
    initials: "SJ",
    bg: "bg-blue-500",
    rating: 5
  },
  {
    name: "David K.",
    role: "Screen Repair Customer",
    quote: "I thought my shattered display was completely done for. The tech team fixed it in under an hour using original OEM parts. It feels and looks brand new!",
    initials: "DK",
    bg: "bg-indigo-500",
    rating: 5
  },
  {
    name: "Elena Rostova",
    role: "Verified Shop Buyer",
    quote: "The curated catalog is stellar, but the support is the real hero here. Extremely knowledgeable team who helped me pick the right device for my needs.",
    initials: "ER",
    bg: "bg-purple-500",
    rating: 5
  }
];

export function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="py-24 bg-transparent text-slate-900 relative overflow-hidden">
      <Container className="relative z-10">
        <div className="mb-20 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-[0.2em]">
            Client Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            What Our Customers <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">Are Saying</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto">
            Discover why thousands of users trust us for their premium mobile shopping and expert technical repairs.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {TESTIMONIALS.map((t, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <SpotlightCard className="h-full border-slate-100 bg-white/70 backdrop-blur-sm">
                <div className="p-8 flex flex-col justify-between h-full relative z-10">
                  <div>
                    {/* Stars and Quote Mark */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex gap-1">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} size={16} className="fill-indigo-500 text-indigo-500" />
                        ))}
                      </div>
                      <Quote size={28} className="text-indigo-100 fill-indigo-50/50 shrink-0" />
                    </div>

                    <p className="text-slate-600 font-medium italic leading-relaxed mb-8">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-100">
                    <div className={`w-12 h-12 rounded-full ${t.bg} text-white flex items-center justify-center font-bold text-sm shadow-md shadow-slate-200/50`}>
                      {t.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{t.name}</h4>
                      <p className="text-xs text-slate-400 font-medium">{t.role}</p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
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
      className={`group relative border bg-white overflow-hidden rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/5 ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.08),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  );
}
