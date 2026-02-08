"use client";

import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Badge } from '@mobile-shop/ui';
import { User, Package, Settings, LogOut, Loader2, ChevronRight, Box } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function AccountPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('orders');
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auth
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
        router.push('/login');
        return;
    }

    setUser(JSON.parse(userStr));
    fetchOrders(token);
  }, [router]);

  const fetchOrders = async (token: string) => {
      try {
          const res = await fetch('http://localhost:5001/api/orders/myorders', {
              headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
              const data = await res.json();
              setOrders(data);
          }
      } catch (error) {
          console.error("Failed to fetch orders", error);
      } finally {
          setLoading(false);
      }
  };

  const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login');
  };

  if (loading) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
        <Container>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-72 shrink-0">
                    <Card className="sticky top-24 overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                        <div className="p-6 bg-slate-900 dark:bg-slate-950 text-white">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg font-bold shadow-lg shadow-indigo-500/30">
                                    {user?.name?.charAt(0) || 'U'}
                                </div>
                                <div className="overflow-hidden">
                                    <div className="font-bold truncate">{user?.name}</div>
                                    <div className="text-xs text-slate-400 truncate">{user?.email}</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 space-y-1">
                            <NavButton active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} icon={Package}>Orders</NavButton>
                            <NavButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={Settings}>Settings</NavButton>
                            <div className="my-2 border-t border-slate-100 dark:border-slate-800"></div>
                            <NavButton active={false} onClick={handleLogout} icon={LogOut} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600">Sign Out</NavButton>
                        </div>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                            {activeTab === 'orders' ? 'My Orders' : 'Account Settings'}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400">
                            {activeTab === 'orders' ? 'View and track your recent purchases.' : 'Manage your profile and preferences.'}
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === 'orders' ? (
                            <motion.div 
                                key="orders"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-4"
                            >
                                {orders.length === 0 ? (
                                    <Card className="p-12 text-center border-dashed border-2 border-slate-200 dark:border-slate-800 bg-transparent">
                                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                            <Box size={32} />
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No orders yet</h3>
                                        <p className="text-slate-500 max-w-sm mx-auto mb-6">
                                            Looks like you haven't placed any orders yet. Start shopping to see them here.
                                        </p>
                                        <Button onClick={() => router.push('/shop')}>Start Shopping</Button>
                                    </Card>
                                ) : (
                                    orders.map((order) => (
                                        <Card key={order._id} className="overflow-hidden border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                                            <div className="p-6">
                                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
                                                            <Package size={24} />
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-slate-900 dark:text-white">Order #{order._id.slice(-6).toUpperCase()}</div>
                                                            <div className="text-sm text-slate-500">
                                                                Placed on {new Date(order.createdAt).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Badge variant={
                                                        order.status === 'delivered' ? 'default' : 
                                                        order.status === 'shipped' ? 'secondary' : 'outline'
                                                    } className="capitalize px-3 py-1 text-sm self-start md:self-center">
                                                        {order.status}
                                                    </Badge>
                                                </div>

                                                <div className="space-y-4">
                                                    {order.items.map((item: any, idx: number) => (
                                                        <div key={idx} className="flex items-center gap-4 py-2 border-b border-slate-50 dark:border-slate-800/50 last:border-0">
                                                            <div className="h-12 w-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 text-xs font-medium">
                                                                IMG
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="font-medium text-slate-900 dark:text-white">{item.productName}</div>
                                                                <div className="text-sm text-slate-500">Qty: {item.quantity}</div>
                                                            </div>
                                                            <div className="font-medium text-slate-900 dark:text-white">
                                                                ${item.price.toLocaleString()}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 flex justify-between items-center border-t border-slate-200 dark:border-slate-800">
                                                <div className="text-sm">
                                                    <span className="text-slate-500 mr-2">Total Amount:</span>
                                                    <span className="font-bold text-lg text-slate-900 dark:text-white">
                                                        ${order.totalAmount.toLocaleString()}
                                                    </span>
                                                </div>
                                                <Button size="sm" variant="outline" className="gap-2">
                                                    View Details <ChevronRight size={14} />
                                                </Button>
                                            </div>
                                        </Card>
                                    ))
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="settings"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <Card className="p-8 border-slate-200 dark:border-slate-800 text-center py-20">
                                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                                        <Settings size={40} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Settings Coming Soon</h3>
                                    <p className="text-slate-500 max-w-md mx-auto">
                                        We are currently building a comprehensive settings panel for you to manage your profile, security, and preferences.
                                    </p>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </Container>
    </div>
  );
}

function NavButton({ active, children, icon: Icon, onClick, className = '' }: any) {
    return (
        <button 
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                active 
                ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-semibold' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
            } ${className}`}
        >
            <Icon className={`w-5 h-5 ${active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
            {children}
            {active && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
        </button>
    )
}
