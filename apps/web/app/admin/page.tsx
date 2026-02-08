"use client";

import React, { useEffect, useState } from 'react';
import { Card, Button } from '@mobile-shop/ui';
import { DollarSign, ShoppingCart, Activity, Users, TrendingUp, TrendingDown, ArrowRight, PackageX, Smartphone, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    usersCount: 0,
    ordersCount: 0,
    revenue: 0,
    servicesCount: 12
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = { 'Authorization': `Bearer ${token}` };

            const usersRes = await fetch('http://localhost:5001/api/auth/users', { headers });
            const users = await usersRes.json();
            
            const ordersRes = await fetch('http://localhost:5001/api/orders', { headers });
            const orders = await ordersRes.json();

            const revenue = Array.isArray(orders) ? orders.reduce((acc: number, order: any) => acc + (order.totalAmount || 0), 0) : 0;

            setStats({
                usersCount: users.length || 0,
                ordersCount: orders.length || 0,
                revenue,
                servicesCount: 12
            });
            
            setRecentOrders(Array.isArray(orders) ? orders.slice(0, 5) : []);

            const bookingsRes = await fetch('http://localhost:5001/api/services/bookings', { headers });
            const bookings = await bookingsRes.json();
            setRecentBookings(Array.isArray(bookings) ? bookings.slice(0, 3) : []);
            
            setStats(prev => ({
                ...prev,
                servicesCount: bookings.length || 0
            }));
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
  }, []);

  if (loading) return (
      <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-end"
      >
        <div>
           <h1 className="text-4xl font-black text-white tracking-tighter bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
             Dashboard
           </h1>
           <p className="text-slate-400 text-sm mt-1">Real-time platform overview.</p>
        </div>
        <div className="flex gap-2">
           <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold animate-pulse">
               <span className="h-2 w-2 rounded-full bg-emerald-400 block" /> Live
           </span>
        </div>
      </motion.div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title="Total Revenue" 
            value={`$${stats.revenue.toLocaleString()}`} 
            change="+20.1%" 
            trend="up" 
            icon={DollarSign} 
            color="indigo"
            delay={0.1}
        />
        <StatCard 
            title="Total Orders" 
            value={stats.ordersCount.toString()} 
            change="+12.5%" 
            trend="up" 
            icon={ShoppingCart} 
            color="blue"
            delay={0.2}
        />
        <StatCard 
            title="Pending Services" 
            value={stats.servicesCount.toString()} 
            change="-2.4%" 
            trend="down" 
            icon={Activity} 
            color="orange"
            delay={0.3}
        />
        <StatCard 
            title="Total Users" 
            value={stats.usersCount.toLocaleString()} 
            change="+11.0%" 
            trend="up" 
            icon={Users} 
            color="emerald"
            delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Section */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="col-span-1 lg:col-span-2"
        >
            <Card noPadding className="p-0 overflow-hidden border-slate-800/50 shadow-2xl bg-slate-900/40 backdrop-blur-xl h-full flex flex-col">
              <div className="p-6 border-b border-slate-800/50 flex justify-between items-center bg-white/5">
                <div>
                  <h3 className="font-bold text-white text-lg tracking-tight">Recent Transactions</h3>
                  <p className="text-xs text-slate-500 mt-1">Latest financial records</p>
                </div>
                <Button variant="outline" className="text-xs h-8 border-slate-700 text-slate-300 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all">
                    View All <ArrowRight size={12} className="ml-1" />
                </Button>
              </div>
              <div className="divide-y divide-slate-800/50 flex-1">
                {recentOrders.length === 0 ? (
                    <div className="p-12 flex flex-col items-center justify-center text-slate-600 h-full min-h-[300px]">
                        <div className="bg-slate-800/50 p-6 rounded-full mb-4 ring-1 ring-slate-700">
                            <PackageX size={48} className="text-slate-500" />
                        </div>
                        <p className="text-lg font-medium text-slate-400">No transactions found</p>
                        <p className="text-sm text-slate-600">New orders will appear here automatically.</p>
                    </div>
                ) : (
                    recentOrders.map((order: any, index) => (
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        key={order._id} 
                        className="flex items-center justify-between p-4 hover:bg-white/5 transition duration-200 group cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400 flex items-center justify-center text-lg border border-indigo-500/30 group-hover:scale-110 transition-transform">
                            <ShoppingCart size={18} />
                        </div>
                        <div>
                            <div className="font-bold text-slate-200 group-hover:text-white transition-colors">Order #{order._id.slice(-6).toUpperCase()}</div>
                            <div className="text-xs text-slate-500 flex items-center gap-2">
                                <span className="bg-slate-800 px-1.5 rounded text-[10px]">{order.items?.length || 0} items</span>
                                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                        </div>
                        <div className="text-right">
                        <div className="font-black text-white tracking-tight">${order.totalAmount?.toLocaleString()}</div>
                        <StatusBadge status={order.status} />
                        </div>
                    </motion.div>
                    ))
                )}
              </div>
            </Card>
        </motion.div>

        {/* Service Status */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
        >
            <Card noPadding className="p-0 overflow-hidden border-slate-800/50 shadow-2xl bg-slate-900/40 backdrop-blur-xl h-full">
               <div className="p-6 border-b border-slate-800/50 bg-white/5">
                  <h3 className="font-bold text-white text-lg tracking-tight">Active Repairs</h3>
                  <p className="text-xs text-slate-500 mt-1">Technician workload</p>
               </div>
               <div className="p-4 space-y-3">
                 {recentBookings.length === 0 ? (
                    <div className="text-center py-10 text-slate-500 text-sm">No active repairs</div>
                 ) : (
                    recentBookings.map((booking: any, i: number) => (
                   <div key={booking._id} className="group flex items-start gap-4 p-4 rounded-xl border border-slate-800/50 bg-gradient-to-br from-slate-900/50 to-slate-800/50 hover:from-indigo-900/20 hover:to-purple-900/20 hover:border-indigo-500/30 transition-all cursor-pointer">
                     <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 group-hover:border-indigo-500/50 transition-colors">
                        <Smartphone size={18} className="text-indigo-400" />
                     </div>
                     <div className="flex-1 min-w-0">
                       <div className="flex justify-between items-start">
                           <div className="text-sm font-bold text-slate-200 truncate group-hover:text-white">{booking.deviceModel}</div>
                           <Clock size={14} className="text-orange-400" />
                       </div>
                       <div className="text-xs text-slate-500 mt-0.5">{booking.serviceId?.name || 'Service'}</div>
                       
                       <div className="mt-3 flex items-center justify-between">
                          <div className="flex -space-x-2">
                           <div className="h-6 w-6 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[8px] text-white">JD</div>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${booking.status === 'confirmed' ? 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20' : 'text-amber-300 bg-amber-500/10 border-amber-500/20'}`}>
                              {new Date(booking.date).toLocaleDateString()}
                          </span>
                       </div>
                     </div>
                   </div>
                 )))} 
                 <Button variant="ghost" className="w-full text-xs text-slate-400 hover:text-white hover:bg-slate-800">
                    View Schedule
                 </Button>
               </div>
            </Card>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, trend, icon: Icon, color, delay }: any) {
  const isUp = trend === 'up';
  
  const colorMap: any = {
      indigo: 'text-indigo-400 group-hover:text-indigo-300',
      blue: 'text-blue-400 group-hover:text-blue-300',
      orange: 'text-orange-400 group-hover:text-orange-300',
      emerald: 'text-emerald-400 group-hover:text-emerald-300',
  };
  
  const bgMap: any = {
      indigo: 'group-hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.3)]',
      blue: 'group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]',
      orange: 'group-hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.3)]',
      emerald: 'group-hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]',
  };

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        whileHover={{ y: -5 }}
        className={`p-6 rounded-2xl border border-slate-800/60 bg-gradient-to-br from-slate-900/60 to-slate-900/40 backdrop-blur-xl relative overflow-hidden group transition-all duration-300 ${bgMap[color]}`}
    >
      <div className={`absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-10 transition-opacity duration-500 transform scale-150`}>
         <Icon size={120} />
      </div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-3 rounded-xl bg-slate-950 border border-slate-800 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
            <Icon size={24} className={colorMap[color]} />
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full border ${isUp ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-rose-400 bg-rose-500/10 border-rose-500/20'}`}>
          {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {change}
        </div>
      </div>
      
      <div className="relative z-10">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 group-hover:text-slate-400 transition-colors">{title}</p>
        <h3 className="text-3xl font-black text-white tracking-tighter shadow-black drop-shadow-lg">{value}</h3>
      </div>
    </motion.div>
  )
}

function StatusBadge({ status }: { status: string }) {
    const styles: any = {
        pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        processing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        cancelled: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    };
    
    return (
        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${styles[status] || styles.pending} inline-block mt-1 tracking-wide`}>
            {status}
        </span>
    )
}
