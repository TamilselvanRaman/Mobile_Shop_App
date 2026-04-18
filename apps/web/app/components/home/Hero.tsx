"use client";

import { Container, Button } from "@mobile-shop/ui";
import { ArrowRight, Sparkles, Star, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { CountUp } from "../ui/CountUp";

const ThreeScene = dynamic(() => import("../3d/Scene").then((mod) => mod.ThreeScene), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-sm animate-pulse rounded-3xl" />
});

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
        damping: 15
      }
    },
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-screen w-full bg-slate-950 overflow-hidden flex items-center pt-24 md:pt-0">
      {/* 3D Background Layer - Optimized for responsive */}
      <div className="absolute inset-0 z-0 opacity-40 md:opacity-60">
         <ThreeScene />
      </div>

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <Container>
          <motion.div 
            className="max-w-4xl mx-auto lg:mx-0 text-center lg:text-left space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-primary-300 backdrop-blur-xl shadow-indigo-glow">
                <Sparkles className="h-3.5 w-3.5 mr-2 text-primary-400" />
                New Arrivals: iPhone 15 Pro Max
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1]"
            >
              The Next Era <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-indigo-400 to-violet-400 animate-gradient-x">
                Of Mobile.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Premium devices, genuine accessories, and master-level repairs. 
              Elevate your mobile experience with MobileShop.
            </motion.p>

            {/* Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <Link href="/shop" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-lg rounded-2xl bg-primary-600 hover:bg-primary-700 text-white shadow-2xl shadow-primary-500/40 border-0 group">
                  Explore Shop
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <Button size="lg" variant="ghost" className="w-full sm:w-auto h-14 px-10 text-lg rounded-2xl border border-white/10 text-white hover:bg-white/5 backdrop-blur-sm">
                  Service Center
                </Button>
              </Link>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
               variants={itemVariants}
               className="pt-12 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-white/10 max-w-3xl"
            >
               <StatBox to={50} suffix="k+" label="Customers" />
               <StatBox to={4.9} decimals={1} suffix="/5" label="Top Rated" />
               <StatBox to={24} suffix="h" label="Fast Fix" className="hidden md:block" />
            </motion.div>

          </motion.div>
        </Container>
      </div>
    </section>
  );
}

function StatBox({ to, decimals = 0, suffix = "", label, className = "" }: any) {
    return (
        <div className={className}>
            <div className="text-2xl sm:text-3xl font-black text-white flex items-baseline">
                <CountUp to={to} decimals={decimals} suffix={suffix} />
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-widest">{label}</div>
        </div>
    )
}
 luxury animation support.

