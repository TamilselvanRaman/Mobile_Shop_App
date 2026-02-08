"use client";

import React from 'react';
import { Card, Button } from '@mobile-shop/ui';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import { Download, Calendar, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 6500 },
  { name: 'Mar', revenue: 4500 },
  { name: 'Apr', revenue: 7000 },
  { name: 'May', revenue: 5500 },
  { name: 'Jun', revenue: 8000 },
  { name: 'Jul', revenue: 6000 },
  { name: 'Aug', revenue: 8500 },
  { name: 'Sep', revenue: 7500 },
  { name: 'Oct', revenue: 9000 },
  { name: 'Nov', revenue: 6500 },
  { name: 'Dec', revenue: 9500 },
];

export default function ReportsPage() {
  const [data, setData] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState({
      totalRevenue: 0,
      netProfit: 0,
      expenseRate: 24,
      avgOrderValue: 0
  });

  React.useEffect(() => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = { 'Authorization': `Bearer ${token}` };
            const res = await fetch('http://localhost:5001/api/orders', { headers });
            const orders = await res.json();
            
            if (!Array.isArray(orders)) return;

            // Process monthly revenue
            const monthlyData = new Array(12).fill(0).map((_, i) => ({
                name: new Date(0, i).toLocaleString('default', { month: 'short' }),
                revenue: 0
            }));

            let totalRev = 0;
            orders.forEach((order: any) => {
                const date = new Date(order.createdAt);
                const month = date.getMonth();
                const amount = order.totalAmount || 0;
                monthlyData[month].revenue += amount;
                totalRev += amount;
            });

            setData(monthlyData);
            
            setStats({
                totalRevenue: totalRev,
                netProfit: totalRev * 0.4, // Estimated 40% margin
                expenseRate: 35,
                avgOrderValue: orders.length > 0 ? totalRev / orders.length : 0
            });

        } catch (error) {
            console.error("Failed to fetch reports data", error);
        }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
      >
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Analytics & Reports</h1>
          <p className="text-slate-400 mt-2 text-sm">Performance metrics and financial overview.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
              <Calendar size={16} className="mr-2" /> Last 30 Days
           </Button>
           <Button className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] border-none">
              <Download size={16} className="mr-2" /> Export PDF
           </Button>
        </div>
      </motion.div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="col-span-1 lg:col-span-2"
         >
             <Card className="p-6 bg-slate-900/40 backdrop-blur-md border-slate-800/50 h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="font-bold text-white text-lg">Revenue Growth</h3>
                        <p className="text-slate-500 text-xs text-opacity-80">Monthly revenue performance</p>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg text-xs font-bold border border-emerald-500/20">
                        <TrendingUp size={14} /> +{stats.totalRevenue > 0 ? '100' : '0'}%
                    </div>
                </div>
                
                <div className="flex-1 w-full min-h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis 
                                dataKey="name" 
                                stroke="#475569" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false} 
                                dy={10}
                            />
                            <Tooltip 
                                cursor={{ fill: '#334155', opacity: 0.2 }}
                                contentStyle={{ 
                                    backgroundColor: '#0f172a', 
                                    borderColor: '#1e293b', 
                                    color: '#f8fafc',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                                itemStyle={{ color: '#818cf8' }}
                                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                            />
                            <Bar 
                                dataKey="revenue" 
                                fill="#6366f1" 
                                radius={[4, 4, 0, 0]} 
                                barSize={40}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
             </Card>
         </motion.div>

         <div className="space-y-6">
            <StatCard 
                title="Net Profit" 
                value={`$${stats.netProfit.toLocaleString()}`} 
                change="+40%" 
                trend="up" 
                icon={DollarSign} 
                color="emerald"
                delay={0.2} 
            />
            <StatCard 
                title="Expense Rate" 
                value={`${stats.expenseRate}%`} 
                change="-2%" 
                trend="down" 
                icon={TrendingDown} 
                color="amber"
                delay={0.3} 
            />
            <StatCard 
                title="Avg Order Value" 
                value={`$${Math.round(stats.avgOrderValue).toLocaleString()}`} 
                change="+5%" 
                trend="up" 
                icon={TrendingUp} 
                color="indigo"
                delay={0.4} 
            />
         </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, trend, icon: Icon, color, delay }: any) {
    const isUp = trend === 'up';
    const colorClasses = {
        emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
        rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    };
    
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay }}
      >
          <Card className="p-6 border-slate-800/50 bg-slate-900/40 backdrop-blur-md shadow-lg relative overflow-hidden group">
            <div className={`absolute top-0 right-0 p-24 rounded-full opacity-5 blur-3xl transition-all duration-500 -translate-y-1/2 translate-x-1/2 bg-${color}-500 group-hover:opacity-10`} />
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses] || colorClasses.indigo}`}>
                  {Icon && <Icon size={20} />}
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${isUp ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-rose-400 bg-rose-500/10 border-rose-500/20'}`}>
                {change}
              </span>
            </div>
            <div className="relative z-10">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{title}</p>
                <h3 className="text-2xl font-black text-white tracking-tight">{value}</h3>
            </div>
          </Card>
      </motion.div>
    )
}
