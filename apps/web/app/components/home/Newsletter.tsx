"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, ShieldCheck } from "lucide-react";
import { Container } from "@mobile-shop/ui";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-transparent">
      <Container>
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-900 p-8 md:p-16 overflow-hidden shadow-2xl shadow-indigo-950/20 border border-slate-800">
          {/* Animated decorative blobs */}
          <div className="absolute top-[-20%] right-[-10%] w-[30rem] h-[30rem] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-30%] left-[-10%] w-[30rem] h-[30rem] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto"
            >
              <Mail size={22} className="stroke-indigo-400" />
            </motion.div>

            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Get 10% Off Your First Order
            </h3>
            
            <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed max-w-lg mx-auto">
              Subscribe to our newsletter for exclusive launches, secret promotional codes, and smart mobile repair guides.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-2xl px-5 py-3.5 w-full text-base focus:outline-none focus:border-indigo-500 focus:bg-white/10 focus:ring-1 focus:ring-indigo-500 transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2.5 shrink-0 shadow-lg shadow-indigo-600/20 active:scale-95"
              >
                {subscribed ? (
                  <>
                    <ShieldCheck size={16} className="text-emerald-400" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    Subscribe
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-slate-500 font-medium">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
