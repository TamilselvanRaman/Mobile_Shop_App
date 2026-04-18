"use client";

import { Container, Button } from "@mobile-shop/ui";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const ThreeScene = dynamic(() => import("../3d/Scene").then((mod) => mod.ThreeScene), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-slate-100/20 backdrop-blur-sm" />
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
    <section className="relative min-h-[90vh] md:h-[800px] w-full bg-[#fdfdff] overflow-hidden flex items-center pt-24 md:pt-0">
      {/* 3D Background Layer - Adjusted for light mode */}
      <div className="absolute inset-0 z-0 opacity-30 md:opacity-50 mix-blend-multiply">
         <ThreeScene />
      </div>

      {/* Decorative Light Glows */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-100/50 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-100/50 blur-[130px] rounded-full" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full">
        <Container>
          <motion.div 
            className="max-w-4xl mx-auto lg:mx-0 text-center lg:text-left space-y-6 md:space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center rounded-full border border-indigo-200 bg-white/80 px-4 py-1.5 text-xs sm:text-sm font-bold text-indigo-600 backdrop-blur-xl shadow-sm">
                <Sparkles className="h-3.5 w-3.5 mr-2 text-indigo-500" />
                New Arrivals: iPhone 15 Series
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[1.05]"
            >
              Future Tech <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                In Your Hands
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium"
            >
              Experience the latest technology with our premium collection of smartphones and accessories. Expert repairs, guaranteed results.
            </motion.p>

            {/* Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <Link href="/shop" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-lg rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-200 border-0">
                  Shop Now
                </Button>
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 text-lg rounded-2xl border-slate-200 bg-white text-slate-900 hover:bg-slate-50 shadow-sm">
                  Book Repair <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
               variants={itemVariants}
               className="pt-10 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 border-t border-slate-100"
            >
               <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 flex items-baseline justify-center lg:justify-start">
                    <CountUp to={50} suffix="k+" />
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">Happy Customers</div>
               </div>
               <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 flex items-baseline justify-center lg:justify-start">
                    <CountUp to={4.9} decimals={1} suffix="/5" />
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">Average Rating</div>
               </div>
               <div className="hidden md:block">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 flex items-baseline">
                    <CountUp to={24} suffix="h" />
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">Turnaround</div>
               </div>
            </motion.div>

          </motion.div>
        </Container>
      </div>
    </section>
  );
}
