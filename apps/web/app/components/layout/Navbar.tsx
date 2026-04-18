"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Button } from "@mobile-shop/ui";
import { ShoppingBag, Wrench, Menu, X, ChevronRight, User, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

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
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Check auth
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
    { href: "/shop", label: "Shop", icon: ShoppingBag },
    { href: "/services", label: "Services", icon: Wrench },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        scrolled
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 py-3 shadow-premium"
          : "bg-transparent py-6"
      )}
    >
      {/* Dynamic Scroll Progress */}
      <motion.div 
        className="absolute bottom-[-1px] left-0 h-[2px] bg-gradient-to-r from-transparent via-primary-500 to-transparent w-full" 
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: scrolled ? 1 : 0, opacity: scrolled ? 1 : 0 }}
      />

      <Container className="flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3 z-50">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-gradient-to-br from-primary-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary-500/30"
          >
            M
          </motion.div>
          <span className="font-display font-black text-xl tracking-tight text-slate-900 dark:text-white uppercase">
            MobileShop<span className="text-primary-600">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-200/30 dark:bg-slate-800/30 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = pathname?.startsWith(link.href) ?? false;
            const Icon = link.icon;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2",
                  isActive
                    ? "text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                {isActive && (
                    <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-primary-600 rounded-full shadow-lg shadow-primary-500/20"
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
          <button 
            onClick={() => setIsOpen(true)}
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 relative group active:scale-90 transition-all"
          >
            <ShoppingBag size={20} className="group-hover:text-primary-600 transition-colors" />
            {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-slate-950 shadow-lg shadow-primary-500/30">
                    {totalItems}
                </span>
            )}
          </button>
          
          <AnimatePresence mode="wait">
            {user ? (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-3 bg-white/50 dark:bg-slate-900/50 p-1 pr-4 rounded-full border border-slate-200 dark:border-slate-800 backdrop-blur-sm"
              >
                <Link href={user.role === 'admin' ? "/admin" : "/account"} className="flex items-center gap-2 group">
                   <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold border border-primary-200 dark:border-primary-800 group-hover:bg-primary-600 group-hover:text-white transition-all">
                      {user.role === 'admin' ? <LayoutDashboard size={14} /> : <User size={14} />}
                   </div>
                   <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-primary-600 transition-colors">
                      {user.role === 'admin' ? 'Dashboard' : 'Profile'}
                   </span>
                </Link>
                <div className="w-px h-4 bg-slate-200 dark:bg-slate-800 mx-1" />
                <button 
                    onClick={handleLogout}
                    className="p-1.5 rounded-full hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-400 hover:text-rose-500 transition-all"
                    title="Sign Out"
                >
                    <LogOut size={16} />
                </button>
              </motion.div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-5 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Sign In
                </Link>
                <Link href="/register">
                  <Button
                    className="rounded-full px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-none hover:opacity-90 shadow-xl shadow-slate-900/10"
                  >
                    Get Started <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 z-50 active:scale-90 transition-all"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Improved Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
              <>
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
                <motion.div 
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-50 bg-white dark:bg-slate-950 shadow-2xl md:hidden flex flex-col pt-24 px-6 pb-8"
                >
                    <div className="flex flex-col gap-2">
                        <SectionTitle>Navigation</SectionTitle>
                        <nav className="space-y-2">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.href} 
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                        "flex items-center justify-between p-4 rounded-2xl transition-all",
                                        pathname?.startsWith(link.href)
                                            ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-800"
                                            : "bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                                            pathname?.startsWith(link.href) ? "bg-primary-600 text-white" : "bg-white dark:bg-slate-800 shadow-sm"
                                        )}>
                                            <link.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-bold">{link.label}</span>
                                    </div>
                                    <ChevronRight size={18} className="opacity-30" />
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="mt-8 flex flex-col gap-2">
                        <SectionTitle>Account</SectionTitle>
                        {user ? (
                            <div className="space-y-3">
                                <Link 
                                    href={user.role === 'admin' ? "/admin" : "/account"} 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800"
                                >
                                    <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-black border-2 border-white dark:border-slate-800 shadow-sm">
                                        {user.customerName?.[0] || user.role?.[0].toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-slate-900 dark:text-white capitalize leading-tight">{user.customerName || 'Admin'}</p>
                                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                    </div>
                                </Link>
                                <Button 
                                    variant="ghost" 
                                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                                    className="w-full justify-center h-12 text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-2xl"
                                >
                                    <LogOut size={18} className="mr-2" /> Sign Out from Device
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                                    <Button variant="secondary" className="w-full h-14 rounded-2xl font-bold bg-slate-100 dark:bg-slate-900 border-none">
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                                    <Button className="w-full h-14 rounded-2xl font-bold bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/25">
                                        Join Now
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                    
                    <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-900">
                        <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
                            &copy; {new Date().getFullYear()} MobileShop Premium
                        </p>
                    </div>
                </motion.div>
              </>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <span className="px-1 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
            {children}
        </span>
    );
}

