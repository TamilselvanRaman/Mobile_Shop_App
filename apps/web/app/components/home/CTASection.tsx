"use client";

import { Container, Button } from "@mobile-shop/ui";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with Gradient and Blobs */}
      <div className="absolute inset-0 bg-slate-900 dark:bg-slate-950 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 opacity-90" />
          <motion.div 
             animate={{ 
                 scale: [1, 1.2, 1],
                 opacity: [0.3, 0.5, 0.3],
             }}
             transition={{ duration: 8, repeat: Infinity }}
             className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]" 
          />
          <motion.div 
             animate={{ 
                 scale: [1, 1.1, 1],
                 opacity: [0.2, 0.4, 0.2],
             }}
             transition={{ duration: 10, repeat: Infinity, delay: 1 }}
             className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]" 
          />
      </div>

      <Container className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium backdrop-blur-sm">
                  <Sparkles className="w-4 h-4" /> <span>Experience the Future</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
                  Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Upgrade?</span>
              </h2>
              
              <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of satisfied customers who trust MobileShop for their premium tech needs. 
                  Expert service, genuine parts, and unbeatable prices.
              </p>
              
              <motion.div 
                className="flex flex-col sm:flex-row justify-center gap-6 pt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                  <Link href="/shop">
                      <motion.button 
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(99, 102, 241, 0.6)" }}
                        whileTap={{ scale: 0.95 }}
                        className="h-14 px-10 rounded-full text-lg font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
                      >
                          <span className="relative z-10">Browse Catalog</span>
                          <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </motion.button>
                  </Link>
                  <Link href="/services">
                      <motion.button 
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                        whileTap={{ scale: 0.95 }}
                        className="h-14 px-10 rounded-full text-lg font-bold border border-indigo-400/30 bg-indigo-950/30 text-indigo-300 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.1)] transition-all flex items-center justify-center gap-3 hover:text-white hover:border-indigo-400/50"
                      >
                          Book a Repair
                      </motion.button>
                  </Link>
              </motion.div>
          </motion.div>
      </Container>
    </section>
  );
}
