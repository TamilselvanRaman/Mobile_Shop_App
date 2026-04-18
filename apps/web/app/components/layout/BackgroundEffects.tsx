"use client";

import { motion } from "framer-motion";

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Rich Multi-Color Background Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50" />
      
      {/* Animated Vivid Blobs */}
      <motion.div 
         animate={{ 
           scale: [1, 1.4, 1],
           rotate: [0, 45, 0],
           opacity: [0.5, 0.7, 0.5]
         }}
         transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
         className="absolute top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-gradient-to-br from-indigo-300/40 via-blue-200/40 to-cyan-200/40 blur-[130px] rounded-full" 
      />
      <motion.div 
         animate={{ 
           scale: [1, 1.5, 1],
           rotate: [0, -45, 0],
           opacity: [0.4, 0.6, 0.4]
         }}
         transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
         className="absolute bottom-[-10%] left-[-10%] w-[900px] h-[900px] bg-gradient-to-tr from-rose-200/30 via-purple-200/30 to-indigo-200/30 blur-[130px] rounded-full" 
      />

      <motion.div 
         animate={{ 
           x: [-100, 100, -100],
           y: [-100, 100, -100],
           opacity: [0.2, 0.3, 0.2]
         }}
         transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
         className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-cyan-200/20 blur-[150px] rounded-full" 
      />
      
      {/* Subtle Mesh Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] contrast-150 brightness-100" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:40px_40px] opacity-[0.04]" />
      
      {/* Glass Overlay */}
      <div className="absolute inset-0 backdrop-blur-[2px]" />
    </div>
  );
}
