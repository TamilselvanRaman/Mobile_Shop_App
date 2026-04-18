"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Button } from "@mobile-shop/ui";
import { ShoppingBag, Wrench, Menu, X, ChevronRight, Sparkles, ArrowRight, Zap, Heart } from "lucide-react";
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
    { href: "/shop", label: "Shop", icon: ShoppingBag, desc: "Premium Collections", color: "text-blue-600", bg: "bg-blue-50" },
    { href: "/services", label: "Services", icon: Wrench, desc: "Repair Excellence", color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        scrolled
          ? "bg-white/80 backdrop-blur-2xl border-b border-slate-200/50 py-3 shadow-sm"
          : "bg-transparent py-6"
      )}
    >
      <Container className="flex items-center justify-between">
        {/* Colorful Logo */}
        <Link href="/" className="group flex items-center gap-3 z-[110]">
          <div className="relative w-11 h-11 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-indigo-500/20 group-hover:rotate-[10deg] transition-all duration-300">
             <Zap size={22} className="fill-white" />
          </div>
          <span className="font-black text-2xl tracking-tighter uppercase text-slate-900 group-hover:text-indigo-600 transition-colors">
            Mobile<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">Shop.</span>
          </span>
        </Link>

        {/* Vibrant Desktop Nav Pill */}
        <nav className="hidden md:flex items-center gap-1 bg-white/60 p-1.5 rounded-3xl border border-slate-200/60 backdrop-blur-xl shadow-xl shadow-slate-100/50">
          {navLinks.map((link) => {
            const isActive = pathname?.startsWith(link.href) ?? false;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-7 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.1em] transition-all duration-300 flex items-center gap-2",
                  isActive
                    ? "text-white"
                    : "text-slate-500 hover:text-indigo-600"
                )}
              >
                {isActive && (
                    <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-lg shadow-indigo-200"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}
                <span className="relative z-10 flex items-center gap-2">
                    <link.icon className="w-4 h-4" />
                    {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-5">
          {user ? (
            <div className="flex items-center gap-5">
                <Link href={user.role === 'admin' ? "/admin" : "/account"}>
                    <Button 
                        className="rounded-2xl px-8 h-12 font-black text-sm uppercase tracking-widest shadow-xl bg-slate-900 text-white hover:bg-indigo-600 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                    >
                        {user.role === 'admin' ? "Admin Hub" : "My Account"}
                    </Button>
                </Link>
                <button 
                    onClick={handleLogout}
                    className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors"
                >
                    Log Out
                </button>
            </div>
          ) : (
            <>
                <Link
                    href="/login"
                    className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 hover:text-indigo-600 transition-colors"
                >
                    Sign In
                </Link>
                <Link href="/register">
                    <Button
                        size="sm"
                        className="rounded-2xl px-8 h-12 font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-100 bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-indigo-200 hover:-translate-y-0.5 active:translate-y-0 transition-all border-0"
                    >
                        Start <ArrowRight className="w-5 h-5 ml-1" />
                    </Button>
                </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn(
              "md:hidden w-12 h-12 flex items-center justify-center rounded-2xl transition-all relative z-[110] border-2",
              mobileMenuOpen 
                ? "bg-indigo-600 text-white border-transparent rotate-90" 
                : "bg-white border-slate-100 text-slate-900 shadow-lg"
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Colorful Mobile Menu */}
        <AnimatePresence>
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="fixed inset-0 z-[105] bg-white md:hidden flex flex-col"
                >
                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-indigo-50/50 to-transparent pointer-events-none" />

                    <div className="relative z-10 flex flex-col h-full pt-32 px-8 pb-12">
                        <div className="flex-1 space-y-10">
                            <section>
                                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300 mb-8 block">Menu</span>
                                <div className="grid grid-cols-1 gap-4">
                                    {navLinks.map((link, idx) => (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + idx * 0.1 }}
                                        >
                                            <Link 
                                                href={link.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={cn(
                                                    "flex items-center justify-between p-6 rounded-[2.5rem] border transition-all",
                                                    "bg-white border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50"
                                                )}
                                            >
                                                <div className="flex items-center gap-5">
                                                    <div className={cn("w-14 h-14 rounded-3xl flex items-center justify-center shadow-inner", link.bg)}>
                                                        <link.icon size={28} className={link.color} />
                                                    </div>
                                                    <div>
                                                        <span className="block font-black text-xl text-slate-900 leading-tight">{link.label}</span>
                                                        <span className="text-xs text-slate-400 font-medium">{link.desc}</span>
                                                    </div>
                                                </div>
                                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                                                    <ChevronRight size={20} className="text-slate-300" />
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-4 pt-10"
                        >
                            {user ? (
                                <div className="space-y-4">
                                    <Link href={user.role === 'admin' ? "/admin" : "/account"} onClick={() => setMobileMenuOpen(false)}>
                                        <Button className="w-full h-16 rounded-3xl bg-slate-900 text-white font-black uppercase tracking-widest text-sm shadow-2xl">
                                            {user.role === 'admin' ? "Admin Dashboard" : "Profile Panel"}
                                        </Button>
                                    </Link>
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full h-16 rounded-3xl border-2 border-slate-100 text-slate-500 font-black uppercase tracking-widest text-xs"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <Link href="/register" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                                        <Button className="w-full h-16 rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black uppercase tracking-widest text-sm shadow-2xl shadow-indigo-100">
                                            Create Account
                                        </Button>
                                    </Link>
                                    <Link href="/login" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                                        <Button variant="ghost" className="w-full h-16 rounded-3xl font-black uppercase tracking-widest text-xs text-slate-500 border-2 border-slate-50">
                                            Already a member? Sign In
                                        </Button>
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
