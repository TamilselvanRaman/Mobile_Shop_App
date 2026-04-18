"use client";

import { Container, Button } from "@mobile-shop/ui";
import { ArrowRight, Sparkles, ShoppingBag, ShieldCheck, Zap, Star } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { CountUp } from "../ui/CountUp";

const ThreeScene = dynamic(() => import("../3d/Scene").then((mod) => mod.ThreeScene), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-sm animate-pulse rounded-[3rem]" />
});

export function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen w-full bg-slate-950 overflow-hidden flex items-center selection:bg-primary-500/30">
      {/* Premium Background Layers */}
      <div className="absolute inset-0 z-0">
        {/* Animated Mesh Gradient */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-primary-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-slate-950" />
        </div>
        
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150 brightness-100 mix-blend-multiply pointer-events-none" />
        
        {/* 3D Model Layer with Parallax */}
        <motion.div 
            style={{ y: y1, opacity }}
            className="absolute inset-0 z-10 hidden lg:block"
        >
           <ThreeScene />
        </motion.div>
      </div>

      <Container className="relative z-20">
        <div className="max-w-4xl mx-auto lg:mx-0 py-20 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10 text-center lg:text-left"
          >
            {/* Elite Badge */}
            <div className="flex justify-center lg:justify-start">
               <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl relative group cursor-default"
               >
                 <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-indigo-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                 <Sparkles className="h-4 w-4 text-primary-400 animate-pulse" />
                 <span className="text-xs font-black uppercase tracking-[0.2em] text-white/80">Premium Mobile Experience</span>
               </motion.div>
            </div>

            {/* Cinematic Headline */}
            <div className="space-y-4">
               <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter text-white leading-[0.85] font-display">
                 BEYOND <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/20">
                    EXPECTATION.
                 </span>
               </h1>
               <div className="h-1.5 w-40 bg-gradient-to-r from-primary-600 to-transparent rounded-full mx-auto lg:mx-0 mt-6" />
            </div>

            {/* Descriptions */}
            <p className="max-w-xl text-lg sm:text-xl text-slate-400 font-medium leading-relaxed mx-auto lg:mx-0">
              Discover a curated collection of world-class mobile technology. 
              Certified devices, precision repairs, and bespoke accessories for the modern digital pioneer.
            </p>

            {/* High-Impact Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Link href="/shop" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-16 px-12 rounded-[2rem] bg-white text-slate-950 border-none font-black text-lg transition-all hover:scale-[1.05] active:scale-95 shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)] flex items-center justify-center group">
                  EXPLORE SHOP 
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <Button variant="ghost" className="w-full sm:w-auto h-16 px-12 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-md text-white font-black text-lg hover:bg-white/10 transition-all flex items-center justify-center">
                  <ShieldCheck className="mr-3 h-5 w-5 text-primary-400" />
                  SERVICE CENTER
                </Button>
              </Link>
            </div>

            {/* Trust Metrics */}
            <div className="pt-16 border-t border-white/5 grid grid-cols-2 md:grid-cols-3 gap-10 max-w-2xl">
              <StatItem label="Active Users" value="50" suffix="k+" />
              <StatItem label="Client Rating" value="4.9" suffix="/5" decimals={1} />
              <StatItem label="Fast Support" value="24" suffix="h" className="hidden md:block" />
            </div>
          </motion.div>
        </div>
      </Container>
      
      {/* Ambient Side Decor */}
      <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-primary-600/10 to-transparent pointer-events-none" />
    </section>
  );
}

function StatItem({ value, label, suffix = "", decimals = 0, className = "" }: any) {
  return (
    <div className={`space-y-1 ${className}`}>
      <div className="text-3xl font-black text-white tracking-tighter flex items-baseline">
        <CountUp to={Number(value)} decimals={decimals} suffix={suffix} />
      </div>
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{label}</div>
    </div>
  );
}
