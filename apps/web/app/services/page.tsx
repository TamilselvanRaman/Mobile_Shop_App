"use client";

import { useState } from "react";
import { Container, Button, Card, Input } from "@mobile-shop/ui";
import { Wrench, CheckCircle, Clock, Shield, ChevronRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

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
      <Container className="min-h-screen py-20 flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }} 
          className="h-24 w-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6 ring-4 ring-green-500/20"
        >
           <CheckCircle className="h-12 w-12 text-green-500" />
        </motion.div>
        <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4"
        >
            Booking Confirmed!
        </motion.h1>
        <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} delay={0.2}
            className="text-slate-500 dark:text-slate-400 max-w-md mb-8 text-lg"
        >
          We've received your repair request. Our technicians will review it and contact you shortly at <span className="text-indigo-500 font-semibold">{formData.email}</span>.
        </motion.p>
        <Button onClick={() => setSubmitted(false)} size="lg" className="rounded-full px-8">Book Another Repair</Button>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] pointer-events-none" />

      <Container className="py-20 relative z-10">
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
             
             <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
               Bring Your Device <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400">Back to Life.</span>
             </h1>
             
             <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed max-w-xl">
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
            <Card className="p-8 md:p-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200 dark:border-slate-800 shadow-2xl shadow-indigo-500/10 rounded-3xl relative overflow-hidden">
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
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
            </div>
        </motion.div>
    )
}
