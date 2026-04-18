"use client";

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Rich Multi-Color Background Base - STATIC */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-white to-blue-100" />
      
      {/* Static Colorful Blobs (No animation as requested) */}
      <div 
         className="absolute top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-indigo-200/40 blur-[130px] rounded-full" 
      />
      <div 
         className="absolute bottom-[-10%] left-[-10%] w-[900px] h-[900px] bg-rose-100/30 blur-[130px] rounded-full" 
      />
      <div 
         className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-cyan-100/20 blur-[150px] rounded-full" 
      />
      
      {/* Subtle Mesh Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:40px_40px] opacity-[0.04]" />
      
      {/* Global Base Tints */}
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white via-transparent to-transparent opacity-60" />
    </div>
  );
}
