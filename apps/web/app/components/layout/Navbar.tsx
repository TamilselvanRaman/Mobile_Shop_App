"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container, Button } from "@mobile-shop/ui";
import { ShoppingBag, Wrench, Menu, X, ChevronRight, User, LogOut, Sparkles, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setIsOpen, totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Shop", href: "/shop", icon: ShoppingBag, desc: "Browse latest tech" },
    { name: "Services", href: "/services", icon: Wrench, desc: "Expert repair & support" },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-700",
        scrolled 
          ? "py-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50" 
          : "py-6 bg-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group relative z-[110]">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
              <span className="text-xl font-black italic">M</span>
            </div>
            <span className={cn(
                "text-xl font-black tracking-tight transition-colors duration-500",
                (scrolled || mobileMenuOpen) ? "text-slate-900 dark:text-white" : "text-white"
            )}>
              MOBILE<span className="text-primary-600">SHOP</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center bg-slate-100/10 dark:bg-white/5 backdrop-blur-md rounded-full px-2 py-1 border border-white/10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2",
                  pathname === link.href 
                    ? "bg-white text-slate-950 shadow-lg" 
                    : scrolled 
                        ? "text-slate-600 dark:text-slate-400 hover:text-primary-600" 
                        : "text-white/70 hover:text-white"
                )}
              >
                <link.icon size={14} />
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setIsOpen(true)}
              className={cn(
                "p-2.5 rounded-full relative group transition-all active:scale-95",
                scrolled 
                    ? "bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300" 
                    : "bg-white/10 border border-white/10 text-white"
              )}
            >
              <ShoppingBag size={20} className="group-hover:text-primary-600 transition-colors" />
              {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-slate-950 shadow-lg shadow-primary-500/30">
                      {totalItems}
                  </span>
              )}
            </button>
            
            <Link href="/login">
                <Button className={cn(
                    "rounded-2xl font-black text-xs uppercase tracking-widest px-8 h-12",
                    scrolled 
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl" 
                        : "bg-white text-slate-900 shadow-2xl"
                )}>
                    Join Now <ChevronRight size={14} className="ml-2" />
                </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={cn(
                "md:hidden p-3 rounded-2xl transition-all relative z-[110] active:scale-90",
                mobileMenuOpen 
                    ? "bg-primary-600 text-white shadow-lg" 
                    : scrolled 
                        ? "bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white" 
                        : "bg-white/10 text-white backdrop-blur-md"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      {/* Premium Full-Screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[105] bg-white dark:bg-slate-950 md:hidden flex flex-col"
          >
            {/* Background Decor */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary-500/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 flex flex-col h-full pt-24 px-6 pb-10">
                <div className="flex-1 space-y-8">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 block">Navigation</span>
                        <div className="space-y-3">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + idx * 0.1 }}
                                >
                                    <Link 
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-between p-5 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary-600 shadow-sm border border-slate-100 dark:border-slate-700">
                                                <link.icon size={24} />
                                            </div>
                                            <div>
                                                <span className="block font-black text-lg text-slate-900 dark:text-white leading-none mb-1">{link.name}</span>
                                                <span className="text-xs text-slate-400 font-medium">{link.desc}</span>
                                            </div>
                                        </div>
                                        <ChevronRight size={20} className="text-slate-300 group-hover:text-primary-600 transition-colors" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 block">Experience</span>
                        <div className="grid grid-cols-2 gap-4">
                             <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                onClick={() => { setIsOpen(true); setMobileMenuOpen(false); }}
                                className="flex flex-col items-center justify-center p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white group"
                             >
                                <div className="w-10 h-10 rounded-full bg-primary-600/10 flex items-center justify-center text-primary-600 mb-2 group-hover:scale-110 transition-transform">
                                    <ShoppingBag size={20} />
                                </div>
                                <span className="text-sm font-black">Bag ({totalItems})</span>
                             </motion.button>
                             <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-col items-center justify-center p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white group"
                             >
                                <div className="w-10 h-10 rounded-full bg-indigo-600/10 flex items-center justify-center text-indigo-600 mb-2 group-hover:scale-110 transition-transform">
                                    <Sparkles size={20} />
                                </div>
                                <span className="text-sm font-black">Deals</span>
                             </motion.div>
                        </div>
                    </div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pt-10 flex flex-col gap-4 border-t border-slate-100 dark:border-slate-800"
                >
                    <div className="flex gap-4">
                        <Link href="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                            <button className="w-full h-14 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 font-black text-sm uppercase tracking-widest shadow-sm">
                                Sign In
                            </button>
                        </Link>
                        <Link href="/register" className="flex-[1.5]" onClick={() => setMobileMenuOpen(false)}>
                            <button className="w-full h-14 rounded-2xl bg-primary-600 text-white border-none font-black text-sm uppercase tracking-widest shadow-lg shadow-primary-500/30 flex items-center justify-center gap-2">
                                Join Now <ArrowRight size={16} />
                            </button>
                        </Link>
                    </div>
                    <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest mt-4">
                        &copy; 2026 MOBILESHOP PREMIUM
                    </p>
                </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
