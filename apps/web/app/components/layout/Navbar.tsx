"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container, Button } from "@mobile-shop/ui";
import { ShoppingBag, Wrench, Menu, X, ChevronRight, User, LogOut, LayoutDashboard, Sparkles } from "lucide-react";
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

  const navLinks = [
    { name: "Shop", href: "/shop", icon: ShoppingBag },
    { name: "Services", href: "/services", icon: Wrench },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
        scrolled 
          ? "py-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm" 
          : "py-6 bg-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
              <span className="text-xl font-bold">M</span>
            </div>
            <span className={cn(
                "text-xl font-black tracking-tighter transition-colors",
                scrolled ? "text-slate-900 dark:text-white" : "text-white"
            )}>
              MOBILE<span className="text-primary-600">SHOP</span>
            </span>
          </Link>

          {/* Original Pill Navigation */}
          <div className="hidden md:flex items-center bg-slate-100/10 dark:bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2",
                  pathname === link.href 
                    ? "bg-primary-600 text-white shadow-lg" 
                    : scrolled 
                        ? "text-slate-600 dark:text-slate-400 hover:text-primary-600" 
                        : "text-white/70 hover:text-white"
                )}
              >
                <link.icon size={16} />
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
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
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-slate-950">
                      {totalItems}
                  </span>
              )}
            </button>
            
            <Link href="/login" className="hidden sm:block">
               <span className={cn(
                   "text-sm font-bold mr-4",
                   scrolled ? "text-slate-600 dark:text-slate-400" : "text-white/80"
               )}>Sign In</span>
            </Link>

            <Link href="/register" className="hidden sm:block">
                <Button className={cn(
                    "rounded-xl font-bold h-10 px-6",
                    scrolled 
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900" 
                        : "bg-white text-slate-900"
                )}>
                    Get Started
                </Button>
            </Link>

            <button 
              className={cn(
                  "md:hidden p-2 rounded-xl",
                  scrolled ? "text-slate-900 dark:text-white" : "text-white"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </Container>

      {/* Simplified Mobile Menu (More consistent with original but cleaner) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-20 left-4 right-4 p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 md:hidden z-[110]"
          >
            <div className="space-y-4">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Navigation</div>
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 group"
                >
                  <link.icon size={20} className="text-primary-600" />
                  <span className="font-bold text-slate-900 dark:text-white">{link.name}</span>
                </Link>
              ))}
              <div className="pt-4 flex gap-4">
                 <Link href="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full rounded-2xl h-12 font-bold">Sign In</Button>
                 </Link>
                 <Link href="/register" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full rounded-2xl h-12 font-bold bg-primary-600 text-white border-none">Join Now</Button>
                 </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
