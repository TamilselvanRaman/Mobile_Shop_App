"use client";

import { motion } from "framer-motion";

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Color Blobs */}
      <motion.div 
         animate={{ 
           scale: [1, 1.2, 1],
           rotate: [0, 90, 0],
           opacity: [0.3, 0.5, 0.3]
         }}
         transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
         className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-gradient-to-br from-indigo-200/40 via-blue-200/40 to-cyan-100/40 blur-[150px] rounded-full" 
      />
      <motion.div 
         animate={{ 
           scale: [1, 1.3, 1],
           rotate: [0, -90, 0],
           opacity: [0.2, 0.4, 0.2]
         }}
         transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
         className="absolute bottom-[-30%] left-[-10%] w-[900px] h-[900px] bg-gradient-to-tr from-rose-100/30 via-purple-100/30 to-indigo-100/30 blur-[150px] rounded-full" 
      />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03]" />
      
      {/* Global Base Color */}
      <div className="absolute inset-0 bg-[#fbfbfe]/50 -z-10" />
    </div>
  );
}
