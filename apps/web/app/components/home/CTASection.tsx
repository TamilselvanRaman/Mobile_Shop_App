"use client";

import { Container, Button } from "@mobile-shop/ui";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden bg-indigo-50/50">
      {/* Background with Gradient and Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-indigo-50 to-white opacity-80" />
          <motion.div 
             animate={{ 
                 scale: [1, 1.2, 1],
                 opacity: [0.1, 0.2, 0.1],
             }}
             transition={{ duration: 8, repeat: Infinity }}
             className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]" 
          />
          <motion.div 
             animate={{ 
                 scale: [1, 1.1, 1],
                 opacity: [0.05, 0.15, 0.05],
             }}
             transition={{ duration: 10, repeat: Infinity, delay: 1 }}
             className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" 
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-600 text-sm font-bold shadow-sm">
                  <Sparkles className="w-4 h-4" /> <span>Experience the Future</span>
              </div>
              
              {/* Headline - RESTORED CONTENT */}
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight">
                  Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Upgrade?</span>
              </h2>
              
              {/* Description - RESTORED CONTENT */}
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
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
                  <Link href="/shop" className="w-full sm:w-auto">
                      <motion.button 
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(79, 70, 229, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto h-16 px-12 rounded-2xl text-lg font-bold bg-indigo-600 text-white shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
                      >
                          <span className="relative z-10">Browse Catalog</span>
                          <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                  </Link>
                  <Link href="/services" className="w-full sm:w-auto">
                      <motion.button 
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto h-16 px-12 rounded-2xl text-lg font-bold border-2 border-slate-200 bg-white text-slate-900 shadow-sm transition-all flex items-center justify-center gap-3 hover:border-slate-300"
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
