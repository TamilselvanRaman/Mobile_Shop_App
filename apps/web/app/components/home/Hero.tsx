"use client";

import { Container, Button } from "@mobile-shop/ui";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const ThreeScene = dynamic(() => import("../3d/Scene").then((mod) => mod.ThreeScene), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-sm" />
});
import { CountUp } from "../ui/CountUp";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
        damping: 10
      }
    },
  };

  return (
    <section className="relative h-[800px] w-full bg-slate-950 overflow-hidden">
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0 opacity-60">
         <ThreeScene />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent flex items-center">
        <Container>
          <motion.div 
            className="max-w-2xl space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300 backdrop-blur-xl shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                <Sparkles className="h-3.5 w-3.5 mr-2 text-indigo-400" />
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                New Arrivals: iPhone 15 Series
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[1.1]"
            >
              Future Tech <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-x">
                In Your Hands
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-xl text-slate-300 leading-relaxed max-w-lg"
            >
              Experience the latest visible technology with our premium collection of smartphones and accessories. Expert repairs, guaranteed.
            </motion.p>

            {/* Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link href="/shop">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] border-0">
                  Shop Now
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm">
                  Book Repair <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
            
            {/* Stats / Social Proof */}
            <motion.div 
               variants={itemVariants}
               className="pt-10 flex flex-wrap items-center gap-8 md:gap-16 border-t border-white/10"
            >
               <div>
                  <div className="text-3xl font-black text-white flex items-baseline">
                    <CountUp to={50} suffix="k+" />
                  </div>
                  <div className="text-sm font-medium text-indigo-200">Happy Customers</div>
               </div>
               <div>
                  <div className="text-3xl font-black text-white flex items-baseline">
                    <CountUp to={4.9} decimals={1} suffix="/5" />
                  </div>
                  <div className="text-sm font-medium text-indigo-200">Average Rating</div>
               </div>
               <div>
                  <div className="text-3xl font-black text-white flex items-baseline">
                    <CountUp to={24} suffix="h" />
                  </div>
                  <div className="text-sm font-medium text-indigo-200">Repair Turnaround</div>
               </div>
            </motion.div>

          </motion.div>
        </Container>
      </div>
    </section>
  );
}
