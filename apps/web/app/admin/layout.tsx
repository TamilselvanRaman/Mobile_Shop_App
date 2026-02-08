"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@mobile-shop/ui';
import { LayoutDashboard, BarChart3, Package, ShoppingBag, Wrench, Users, Settings, LogOut, Bell, Search, Menu, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
        router.push('/login');
        return;
    }

    try {
        const user = JSON.parse(userStr);
        if (user.role !== 'admin') {
            router.push('/account');
            return;
        }
        setIsAuthorized(true);
    } catch (e) {
        router.push('/login');
    }
  }, [router]);

  if (!isAuthorized) return null;

  return (
    <div className="dark">
      <div className="flex h-screen bg-slate-950 font-sans text-slate-100 overflow-hidden relative selection:bg-indigo-500/30">
      
        {/* Background Ambience */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
            <div 
                className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm"
                onClick={() => setSidebarOpen(false)}
            />
        )}

        {/* Glassmorphic Sidebar */}
        <aside 
          className={`
            fixed inset-y-0 left-0 z-30 w-72 flex flex-col border-r border-slate-800 bg-slate-900/90 backdrop-blur-xl transition-transform duration-300 ease-in-out
            lg:translate-x-0 lg:static lg:bg-slate-900/50
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <div className="p-6 pt-10 border-b border-slate-800/50 flex items-center gap-3">
             <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 shrink-0">
               MS
             </div>
             <div>
                <h1 className="text-lg font-bold tracking-tight text-white leading-tight">MobileShop</h1>
                <p className="text-[10px] uppercase tracking-wider text-indigo-400 font-semibold">Enterprise Admin</p>
             </div>
          </div>
          
          <nav className="px-4 py-8 space-y-1 overflow-y-auto custom-scrollbar flex-1">
            <SectionLabel>Overview</SectionLabel>
            <NavItem href="/admin" label="Dashboard" icon={LayoutDashboard} active={pathname === '/admin'} />
            <NavItem href="/admin/reports" label="Analytics" icon={BarChart3} active={pathname === '/admin/reports'} />
            
            <SectionLabel className="mt-8">Management</SectionLabel>
            <NavItem href="/admin/products" label="Products" icon={Package} active={pathname.startsWith('/admin/products')} />
            <NavItem href="/admin/orders" label="Orders" icon={ShoppingBag} active={pathname.startsWith('/admin/orders')} />
            <NavItem href="/admin/services" label="Services" icon={Wrench} active={pathname.startsWith('/admin/services')} />
            <NavItem href="/admin/users" label="Users" icon={Users} active={pathname.startsWith('/admin/users')} />
            
            <SectionLabel className="mt-8">System</SectionLabel>
            <NavItem href="/admin/settings" label="Settings" icon={Settings} active={pathname === '/admin/settings'} />
          </nav>
          
          <div className="p-4 border-t border-slate-800/50 bg-slate-900/60">
             <div className="flex items-center gap-3 mb-4 px-2">
                <div className="h-9 w-9 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold text-sm shrink-0">
                   AD
                </div>
                <div className="flex-1 min-w-0">
                   <p className="text-sm font-semibold truncate text-slate-200">Admin User</p>
                   <p className="text-xs text-slate-500 truncate">admin@mobileshop.com</p>
                </div>
             </div>
  
             <Link href="/" className="mb-2 block">
                <Button variant="outline" className="w-full justify-center text-xs h-9 border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all shadow-sm">
                    <Home size={14} className="mr-2" /> Back to Shop
                </Button>
             </Link>
             
             <Button 
              variant="outline" 
              className="w-full justify-center text-xs h-9 border-slate-700 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50 transition-all"
              onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  router.push('/login');
              }}
             >
                <LogOut size={14} className="mr-2" /> Sign Out
             </Button>
          </div>
        </aside>
  
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 relative z-10 bg-slate-950/50">
          {/* Glass Header */}
          <header className="h-20 flex items-center justify-between px-4 lg:px-8 border-b border-slate-800/60 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-20">
             <div className="flex items-center gap-4">
                <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 -ml-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition lg:hidden">
                    <Menu size={20} />
                </button>
                <div className="relative group hidden sm:block">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Search across platform..." 
                      className="h-10 w-48 sm:w-64 bg-slate-900/50 border border-slate-700/50 rounded-xl pl-10 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent placeholder:text-slate-600 transition-all"
                    />
                </div>
             </div>
             
             <div className="flex items-center gap-3 sm:gap-6">
                <div className="h-10 w-10 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800 cursor-pointer transition-all relative">
                    <Bell size={18} />
                    <span className="absolute top-2 right-2.5 h-2 w-2 bg-rose-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.5)]"></span>
                </div>
                <div className="h-8 w-px bg-slate-800 hidden sm:block" />
                <div className="flex flex-col items-end hidden sm:flex">
                    <div className="text-sm font-bold text-white">
                      {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                    <div className="text-[10px] font-medium text-emerald-400 flex items-center gap-1">
                       <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> System Online
                    </div>
                </div>
             </div>
          </header>
  
          {/* Scrollable Content */}
          <main className="flex-1 overflow-auto p-4 sm:p-8 custom-scrollbar scroll-smooth">
            <div className="max-w-7xl mx-auto space-y-8 pb-20 pt-4">
               {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`px-3 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest ${className}`}>
            {children}
        </div>
    )
}

function NavItem({ href, label, active, icon: Icon }: any) {
  return (
    <Link href={href}>
      <div className={`
        relative flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group overflow-hidden
        ${active 
          ? 'text-white' 
          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/30'
        }
      `}>
        {active && (
            <motion.div 
                layoutId="activeTab"
                className="absolute inset-0 bg-indigo-600/10 border border-indigo-500/50 rounded-xl"
            />
        )}
        {active && (
             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
        )}
        
        <span className={`relative z-10 mr-3 ${active ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
           <Icon size={18} />
        </span>
        <span className="relative z-10">{label}</span>
      </div>
    </Link>
  );
}
