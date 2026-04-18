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
  const [user, setUser] = useState<any>(null);
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled 
          ? "py-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50" 
          : "py-6 bg-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
              <span className="text-xl font-black">M</span>
            </div>
            <span className={cn(
                "text-xl font-black tracking-tighter transition-colors",
                scrolled ? "text-slate-900 dark:text-white" : "text-white"
            )}>
              MOBILE<span className="text-primary-600">SHOP</span>
            </span>
          </Link>

          {/* Desktop Navigation - Central Pill */}
          <div className="hidden md:flex items-center bg-slate-100/10 dark:bg-white/5 backdrop-blur-md rounded-full px-2 py-1 border border-white/10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2",
                  pathname === link.href 
                    ? "bg-white text-slate-950 shadow-lg" 
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
                    "rounded-2xl font-black text-xs uppercase tracking-widest px-8",
                    scrolled 
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl" 
                        : "bg-white text-slate-900 shadow-2xl"
                )}>
                    Get Started <ChevronRight size={14} className="ml-2" />
                </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={cn(
                "md:hidden p-2 rounded-xl transition-colors",
                scrolled ? "text-slate-900 dark:text-white" : "text-white"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary-600 shadow-sm">
                      <link.icon size={20} />
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">{link.name}</span>
                  </div>
                  <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
              <div className="pt-4 flex gap-4">
                 <Link href="/login" className="flex-1">
                    <Button className="w-full rounded-2xl h-12 font-bold bg-primary-600 text-white border-none">Sign In</Button>
                 </Link>
                 <button 
                    onClick={() => { setIsOpen(true); setMobileMenuOpen(false); }}
                    className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400"
                 >
                    <ShoppingBag size={20} />
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
