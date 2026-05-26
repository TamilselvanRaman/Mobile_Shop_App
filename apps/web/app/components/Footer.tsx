"use client";

import React, { useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Zap, ArrowUp, Send } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-950 text-slate-300 border-t border-slate-900">
      {/* Premium Top Gradient Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500" />
      
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/10">
                 <Zap size={20} className="fill-white" />
              </div>
              <span className="font-black text-xl tracking-tighter uppercase text-white">
                Mobile<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">Shop.</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Your one-stop destination for premium mobile devices and expert repair services.
              Experience technology like never before.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/5 hover:-translate-y-1 transition-all duration-300" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-400/50 hover:bg-sky-400/5 hover:-translate-y-1 transition-all duration-300" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-500 hover:border-pink-500/50 hover:bg-pink-500/5 hover:-translate-y-1 transition-all duration-300" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600/50 hover:bg-blue-600/5 hover:-translate-y-1 transition-all duration-300" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-6 tracking-wide relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-0.5 after:bg-indigo-500">Quick Links</h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <a href="/" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-indigo-400 transition-all duration-300"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-indigo-400 transition-all duration-300"></span>
                  Shop
                </a>
              </li>
              <li>
                <a href="/services" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-indigo-400 transition-all duration-300"></span>
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-indigo-400 transition-all duration-300"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-indigo-400 transition-all duration-300"></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-base mb-6 tracking-wide relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-0.5 after:bg-indigo-500">Our Services</h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <a href="/services" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-indigo-400 transition-all duration-300"></span>
                  Screen Repair
                </a>
              </li>
              <li>
                <a href="/services" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-indigo-400 transition-all duration-300"></span>
                  Battery Replacement
                </a>
              </li>
              <li>
                <a href="/services" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-indigo-400 transition-all duration-300"></span>
                  Software Support
                </a>
              </li>
              <li>
                <a href="/services" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-indigo-400 transition-all duration-300"></span>
                  Data Recovery
                </a>
              </li>
              <li>
                <a href="/services" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-indigo-400 transition-all duration-300"></span>
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-base mb-6 tracking-wide relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-0.5 after:bg-indigo-500">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-indigo-500 shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-relaxed">
                  123 Tech Avenue,<br />
                  Silicon Valley, CA 94025
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-indigo-500 shrink-0" />
                <span className="text-slate-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-indigo-500 shrink-0" />
                <span className="text-slate-400">support@mobileshop.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Bar Section */}
        <div className="py-8 my-8 border-t border-b border-slate-900 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="max-w-md text-center lg:text-left">
            <h4 className="text-white font-bold text-lg mb-1">Stay updated with latest offers</h4>
            <p className="text-xs text-slate-400">Get newsletters, coupon codes, and expert tech repair guides straight to your inbox.</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full lg:w-auto max-w-md gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl px-4 py-2.5 w-full lg:w-72 focus:outline-none focus:border-indigo-500 transition-colors"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 shrink-0 shadow-lg shadow-indigo-600/10 active:scale-95"
            >
              {subscribed ? (
                "Subscribed!"
              ) : (
                <>
                  Subscribe
                  <Send size={12} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Copyright Row with Back to Top */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} MobileShop Inc. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookie Policy</a>
          </div>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 flex items-center justify-center transition-all duration-300 shadow-md md:order-last active:scale-90"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}

