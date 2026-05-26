"use client";

import { useState } from "react";
import { Container, Button, Card, Input } from "@mobile-shop/ui";
import { Wrench, CheckCircle, Clock, Shield, ChevronRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ServicesPage() {
  const [formData, setFormData] = useState({
    deviceModel: "",
    issueDescription: "",
    customerName: "",
    contactNumber: "",
    email: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
        const res = await fetch('http://localhost:5001/api/services/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...formData,
                status: 'pending' // Default status
            })
        });
        
        if (res.ok) {
            setSubmitted(true);
        }
    } catch (error) {
        console.error("Booking failed", error);
    } finally {
        setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative overflow-hidden flex items-center justify-center pt-28">
        {/* Ambient Background */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-indigo-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] pointer-events-none" />

        <Container className="relative z-10 py-20 flex flex-col items-center justify-center text-center max-w-xl bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800 p-10 sm:p-16 rounded-[2.5rem] shadow-2xl shadow-indigo-500/5 mx-4">
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} 
            className="h-24 w-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-8 ring-4 ring-emerald-500/20"
          >
             <CheckCircle className="h-12 w-12 text-emerald-500" />
          </motion.div>
          
          <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight"
          >
              Booking Confirmed!
          </motion.h1>
          
          <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-slate-500 dark:text-slate-400 max-w-sm mb-10 text-base leading-relaxed font-medium"
          >
            We&apos;ve received your repair request. Our technicians will review it and contact you shortly at <span className="text-indigo-600 dark:text-indigo-400 font-bold">{formData.email}</span>.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Button 
              onClick={() => setSubmitted(false)} 
              size="lg" 
              className="rounded-2xl px-6 h-12 bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all text-sm w-full sm:w-auto"
            >
              Book Another
            </Button>
            <Link href="/shop" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="ghost"
                className="rounded-2xl px-6 h-12 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold transition-all text-sm w-full"
              >
                Go to Shop
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative overflow-hidden pt-28 lg:pt-32">
      {/* Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] pointer-events-none" />

      <Container className="pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/50 shadow-sm text-indigo-600 dark:text-indigo-400 text-sm font-bold mb-8">
                <Zap className="w-4 h-4 fill-indigo-500" /> Expert Repairs & Diagnostics
             </div>
             
             <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
               Bring Your Device <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400">Back to Life.</span>
             </h1>
             
             <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-relaxed max-w-xl font-medium">
               From cracked screens to complex motherboard repairs, our certified technicians use genuine parts to restore your device to factory standards.
             </p>

             <div className="space-y-8">
                <Feature 
                    icon={Clock} 
                    title="Fast Turnaround" 
                    desc="Most repairs are completed within 2 hours while you wait." 
                    delay={0.2}
                />
                <Feature 
                    icon={Shield} 
                    title="Lifetime Warranty" 
                    desc="We stand behind our craftsmanship with an industry-leading warranty." 
                    delay={0.3}
                />
                <Feature 
                    icon={CheckCircle} 
                    title="Certified Experts" 
                    desc="Our technicians are trained and certified by major manufacturers." 
                    delay={0.4}
                />
             </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6 sm:p-8 md:p-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200 dark:border-slate-800 shadow-2xl shadow-indigo-500/10 rounded-3xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-500" />
               
               <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Book a Repair</h2>
               <p className="text-slate-500 dark:text-slate-400 mb-8">Fill out the form below and we'll get back to you instantly.</p>
               
               <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                     <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Device Model</label>
                     <Input 
                        placeholder="e.g. iPhone 15 Pro Max" 
                        required 
                        value={formData.deviceModel}
                        onChange={e => setFormData({...formData, deviceModel: e.target.value})}
                        className="h-12 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-indigo-500 rounded-xl"
                     />
                  </div>
                  
                  <div className="space-y-2">
                     <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Issue Description</label>
                     <textarea 
                        className="flex min-h-[100px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-indigo-500 transition-all resize-none"
                        placeholder="Describe the problem in detail..."
                        required
                        value={formData.issueDescription}
                        onChange={e => setFormData({...formData, issueDescription: e.target.value})}
                     />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Your Name</label>
                        <Input 
                            placeholder="John Doe" 
                            required 
                            value={formData.customerName}
                            onChange={e => setFormData({...formData, customerName: e.target.value})}
                            className="h-12 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-indigo-500 rounded-xl"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Contact Number</label>
                        <Input 
                            placeholder="+1 (555) 000-0000" 
                            required 
                            value={formData.contactNumber}
                            onChange={e => setFormData({...formData, contactNumber: e.target.value})}
                            className="h-12 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-indigo-500 rounded-xl"
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                     <Input 
                        type="email" 
                        placeholder="john@example.com" 
                        required 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="h-12 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-indigo-500 rounded-xl"
                     />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 mt-4 text-base bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]" 
                    disabled={loading}
                  >
                     {loading ? (
                        <span className="flex items-center gap-2">Processing...</span>
                     ) : (
                        <span className="flex items-center gap-2">Submit Request <ChevronRight size={18} /></span>
                     )}
                  </Button>
               </form>
            </Card>
          </motion.div>
        </div>

        {/* Pricing Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 border-t border-slate-200/50 dark:border-slate-800 pt-16"
        >
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3 px-4">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Transparent Estimations</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Standard baseline pricing for our most common repair services. Diagnostic evaluation is completely free!</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { service: "Screen Replacement", price: "$49+", time: "1-2 Hours", desc: "For cracked glass, LCD bleeds, or dead touch displays." },
              { service: "Battery Swap", price: "$29+", time: "30 Mins", desc: "For battery health degradation, bloating, or power cycle loops." },
              { service: "Charging Port Fix", price: "$39+", time: "1 Hour", desc: "For loose ports, physical connector bend, or charging failures." },
              { service: "Software Restore", price: "$19+", time: "30 Mins", desc: "For lockouts, continuous bootloops, or firmware updates." }
            ].map((p, idx) => (
              <div key={idx} className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-100 dark:border-slate-800/80 p-6 rounded-3xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/20 group flex flex-col justify-between">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-indigo-500/10 group-hover:bg-indigo-600 transition-colors" />
                <div>
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-2">{p.time}</span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">{p.service}</h3>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed font-medium">{p.desc}</p>
                </div>
                <div className="flex items-baseline gap-1 mt-auto">
                  <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{p.price}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">est.</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
}

function Feature({ icon: Icon, title, desc, delay }: any) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay || 0, duration: 0.5 }}
            className="flex gap-5 group"
        >
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm group-hover:scale-110 group-hover:border-indigo-500/50 group-hover:shadow-indigo-500/20 transition-all duration-300">
                <Icon className="w-7 h-7" />
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-sm">{desc}</p>
            </div>
        </motion.div>
    )
}
