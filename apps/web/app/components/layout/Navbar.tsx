"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Button } from "@mobile-shop/ui";
import { ShoppingBag, Wrench, Menu, X, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Initial check
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (token && storedUser) {
        try {
            setUser(JSON.parse(storedUser));
        } catch (e) {
            console.error("Failed to parse user data");
        }
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      window.location.href = '/';
  };

  const navLinks = [
    { href: "/shop", label: "Shop", icon: ShoppingBag, desc: "Latest devices" },
    { href: "/services", label: "Services", icon: Wrench, desc: "Expert support" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/50 py-3 shadow-sm"
          : "bg-transparent py-5"
      )}
    >
      <Container className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2 z-[110]">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            M
          </div>
          <span className={cn(
              "font-black text-xl tracking-tight uppercase transition-colors",
              (scrolled || mobileMenuOpen) ? "text-slate-900" : "text-slate-900"
          )}>
            MobileShop<span className="text-indigo-600">.</span>
          </span>
        </Link>

        {/* Original Desktop Nav Pill - Adjusted for Light Theme */}
        <nav className="hidden md:flex items-center gap-1 bg-white/50 p-1.5 rounded-full border border-slate-200/50 backdrop-blur-md shadow-sm">
          {navLinks.map((link) => {
            const isActive = pathname?.startsWith(link.href) ?? false;
            const Icon = link.icon;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2",
                  isActive
                    ? "text-white"
                    : "text-slate-500 hover:text-indigo-600"
                )}
              >
                {isActive && (
                    <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-indigo-600 rounded-full shadow-lg shadow-indigo-200"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}
                <span className="relative z-10 flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
                <Link href={user.role === 'admin' ? "/admin" : "/account"}>
                    <Button 
                        className="rounded-full px-6 font-bold shadow-md bg-slate-900 text-white hover:bg-slate-800 active:scale-95 transition-all"
                    >
                        {user.role === 'admin' ? "Admin Panel" : "My Profile"}
                    </Button>
                </Link>
                <button 
                    onClick={handleLogout}
                    className="text-sm font-bold text-slate-500 hover:text-red-500 transition-colors"
                >
                    Sign Out
                </button>
            </div>
          ) : (
            <>
                <Link
                    href="/login"
                    className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors"
                >
                    Sign In
                </Link>
                <Link href="/register">
                    <Button
                        size="sm"
                        className="rounded-full px-6 font-bold shadow-lg bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all"
                    >
                        Get Started <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn(
              "md:hidden p-3 rounded-2xl transition-all relative z-[110] border",
              mobileMenuOpen 
                ? "bg-indigo-600 text-white border-transparent" 
                : "bg-white border-slate-200 text-slate-900 shadow-sm"
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Premium Mobile Menu Overlay */}
        <AnimatePresence>
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="fixed inset-0 z-[105] bg-white md:hidden flex flex-col"
                >
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
                        <div className="absolute top-[-5%] right-[-5%] w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
                    </div>

                    <div className="relative z-10 flex flex-col h-full pt-24 px-6 pb-10">
                        <div className="flex-1 space-y-8">
                            <section>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 block">Explore</span>
                                <div className="space-y-3">
                                    {navLinks.map((link, idx) => (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 + idx * 0.1 }}
                                        >
                                            <Link 
                                                href={link.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="flex items-center justify-between p-5 rounded-[2rem] bg-slate-50 border border-slate-100"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                        <link.icon size={24} />
                                                    </div>
                                                    <div>
                                                        <span className="block font-black text-lg text-slate-900">{link.label}</span>
                                                        <span className="text-xs text-slate-400">{link.desc}</span>
                                                    </div>
                                                </div>
                                                <ChevronRight size={18} className="text-slate-300" />
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="pt-8 border-t border-slate-100 flex flex-col gap-4"
                        >
                            {user ? (
                                <div className="space-y-3">
                                    <Link href={user.role === 'admin' ? "/admin" : "/account"} onClick={() => setMobileMenuOpen(false)}>
                                        <Button className="w-full h-14 rounded-2xl bg-slate-900 text-white font-bold shadow-lg">
                                            {user.role === 'admin' ? "Open Dashboard" : "View Profile"}
                                        </Button>
                                    </Link>
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full h-14 rounded-2xl border border-slate-200 text-slate-500 font-bold"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <div className="flex gap-4">
                                    <Link href="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                                        <Button variant="outline" className="w-full h-14 rounded-2xl font-bold border-slate-200">Sign In</Button>
                                    </Link>
                                    <Link href="/register" className="flex-[1.5]" onClick={() => setMobileMenuOpen(false)}>
                                        <Button className="w-full h-14 rounded-2xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-100">Join Now</Button>
                                    </Link>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </Container>
    </header>
  );
}
