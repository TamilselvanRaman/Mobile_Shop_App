"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Container, Button } from "@mobile-shop/ui";
import { ShoppingBag, Wrench, Menu, X, ChevronRight } from "lucide-react";
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

    // Check auth
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 py-3 shadow-sm"
          : "bg-transparent border-b border-transparent py-5"
      )}
    >
      {/* Scroll Progress Line */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-full" 
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: scrolled ? 1 : 0, opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
      <Container className="flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2 z-50">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            M
          </div>
          <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white uppercase">
            MobileShop<span className="text-indigo-600">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 dark:bg-slate-900/50 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            const Icon = link.icon;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2",
                  isActive
                    ? "text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
                )}
              >
                {isActive && (
                    <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-indigo-600 rounded-full shadow-md shadow-indigo-500/20"
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

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
                {user.role === 'admin' ? (
                    <Link href="/admin">
                        <Button 
                            className="rounded-full px-6 bg-indigo-600 text-white hover:bg-indigo-700 font-semibold shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
                        >
                            Admin Panel
                        </Button>
                    </Link>
                ) : (
                    <Link href="/account">
                        <Button 
                            className="rounded-full px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-semibold shadow-lg shadow-slate-900/20 active:scale-95 transition-all"
                        >
                            My Profile
                        </Button>
                    </Link>
                )}
                <button 
                    onClick={handleLogout}
                    className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-red-500 transition-colors"
                >
                    Sign Out
                </button>
            </div>
          ) : (
            <>
                <Link
                    href="/login"
                    className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                    Sign In
                </Link>
                <Link href="/register">
                    <Button
                    size="sm"
                    className="rounded-full px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-semibold shadow-lg shadow-slate-900/20 active:scale-95 transition-all"
                    >
                    Get Started <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                </Link>
            </>
          )}
        </div>

        {/* Mobile Filter Button */}
        <button
          className="md:hidden p-2 text-slate-600 dark:text-slate-400 z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed inset-0 top-0 z-40 bg-white dark:bg-slate-950 px-6 pt-24 pb-10 flex flex-col md:hidden"
            >
                <nav className="flex flex-col gap-6 text-lg font-medium">
                     {navLinks.map((link) => (
                        <Link 
                            key={link.href} 
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
                        >
                            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                <link.icon className="w-5 h-5" />
                            </div>
                            {link.label}
                        </Link>
                     ))}
                </nav>
                <div className="mt-auto flex flex-col gap-4">
                    {user ? (
                        <>
                            {user.role === 'admin' ? (
                                <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full justify-center h-12 text-base bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/30">
                                        Admin Panel
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/account" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full justify-center h-12 text-base bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl">
                                        My Profile
                                    </Button>
                                </Link>
                            )}
                            <Button 
                                variant="outline" 
                                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                                className="w-full justify-center h-12 text-base rounded-xl text-red-500 border-red-200 hover:bg-red-50"
                            >
                                Sign Out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                <Button variant="outline" className="w-full justify-center h-12 text-base rounded-xl">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                                <Button className="w-full justify-center h-12 text-base bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/30">
                                    Get Started
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </motion.div>
        )}
      </Container>
    </header>
  );
}
