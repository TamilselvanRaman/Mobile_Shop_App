"use client";

import { Container, Button } from "@mobile-shop/ui";
import { ArrowRight, Sparkles, Zap, Star, Shield } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const ThreeScene = dynamic(() => import("../3d/Scene").then((mod) => mod.ThreeScene), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-slate-50/20 backdrop-blur-sm" />
});
import { CountUp } from "../ui/CountUp";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
  };

  return (
    <section className="relative min-h-[95vh] md:h-[850px] w-full bg-[#f8f9ff] overflow-hidden flex items-center pt-24 md:pt-0">
      {/* Dynamic Color Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
           animate={{ 
             scale: [1, 1.2, 1],
             rotate: [0, 90, 0],
             opacity: [0.4, 0.6, 0.4]
           }}
           transition={{ duration: 15, repeat: Infinity }}
           className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-cyan-200/50 via-indigo-200/50 to-purple-200/50 blur-[150px] rounded-full" 
        />
        <motion.div 
           animate={{ 
             scale: [1, 1.3, 1],
             rotate: [0, -90, 0],
             opacity: [0.3, 0.5, 0.3]
           }}
           transition={{ duration: 18, repeat: Infinity, delay: 2 }}
           className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-gradient-to-tr from-rose-200/40 via-orange-100/40 to-yellow-100/40 blur-[150px] rounded-full" 
        />
      </div>

      {/* 3D Visualizer */}
      <div className="absolute inset-0 z-1 opacity-40 md:opacity-60 mix-blend-multiply">
         <ThreeScene />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <Container>
          <motion.div 
            className="max-w-4xl mx-auto lg:mx-0 text-center lg:text-left space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge - RESTORED CONTENT */}
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center rounded-full border border-indigo-200 bg-white/70 px-5 py-2 text-xs sm:text-sm font-black uppercase tracking-widest text-indigo-600 backdrop-blur-xl shadow-xl shadow-indigo-100/50">
                <Sparkles className="h-4 w-4 mr-2 text-indigo-500 animate-pulse" />
                New Arrivals: iPhone 15 Series
              </div>
            </motion.div>

            {/* Headline - RESTORED CONTENT */}
            <motion.h1 
              variants={itemVariants}
              className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-slate-900 leading-[1.05]"
            >
              Future Tech <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 leading-normal">
                 In Your Hands
              </span>
            </motion.h1>

            {/* Description - RESTORED CONTENT */}
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium"
            >
              Experience the latest visible technology with our premium collection of smartphones and accessories. Expert repairs, guaranteed.
            </motion.p>

            {/* Buttons - RESTORED STYLE with ORIGINAL LABELS */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4"
            >
              <Link href="/shop" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-16 px-12 text-xl rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white shadow-[0_20px_40px_rgba(79,70,229,0.3)] border-0 hover:scale-105 transition-transform duration-300">
                  Shop Now
                </Button>
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <Button size="lg" variant="ghost" className="w-full sm:w-auto h-16 px-12 text-xl rounded-2xl border-2 border-slate-200 bg-white/50 backdrop-blur-md text-slate-900 hover:bg-white shadow-sm transition-all">
                  Book Repair <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </motion.div>
            
            {/* Stats Grid - RESTORED ORIGINAL LABELS */}
            <motion.div 
               variants={itemVariants}
               className="pt-12 grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 border-t border-slate-200/60"
            >
               <StatItem icon={Zap} to={50} suffix="k+" label="Happy Customers" color="text-blue-600" />
               <StatItem icon={Star} to={4.9} decimals={1} suffix="/5" label="Average Rating" color="text-yellow-500" />
               <StatItem icon={Sparkles} to={24} suffix="h" label="Repair Turnaround" color="text-purple-600" />
            </motion.div>

          </motion.div>
        </Container>
      </div>
    </section>
  );
}

function StatItem({ icon: Icon, to, decimals = 0, suffix = "", label, color, className = "" }: any) {
    return (
        <div className={`flex flex-col items-center lg:items-start space-y-2 ${className}`}>
            <div className={`p-2 rounded-xl bg-slate-100 ${color}/10 hidden lg:block`}>
                <Icon size={18} className={color} />
            </div>
            <div className="text-3xl font-black text-slate-900 flex items-baseline">
                <CountUp to={to} decimals={decimals} suffix={suffix} />
            </div>
            <div className="text-xs font-black uppercase tracking-widest text-slate-400">{label}</div>
        </div>
    )
}
