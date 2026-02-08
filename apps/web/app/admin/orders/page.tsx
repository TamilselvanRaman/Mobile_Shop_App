"use client";

import React, { useEffect, useState } from 'react';
import { Card, Button, Badge } from '@mobile-shop/ui';

interface Order {
  _id: string;
  items: { product: string, quantity: number }[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch orders", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8">Loading orders...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Order Management</h1>
           <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Track and fulfill customer orders.</p>
        </div>
        <Button variant="outline">Export Data</Button>
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <Card key={order._id} className="p-0 border-slate-200 dark:border-slate-800 overflow-hidden hover:border-primary-200 transition-colors group">
             <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                <div>
                   <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Order #{order._id.slice(-6)}</h3>
                      <Badge variant="outline" className={`text-xs ${order.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                        {order.status || 'Pending'}
                      </Badge>
                   </div>
                   <div className="text-sm text-slate-500 flex gap-4">
                      <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{order.items?.length || 0} Items</span>
                   </div>
                </div>
                
                <div className="flex items-center gap-8">
                   <div className="text-right">
                      <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Total</div>
                      <div className="font-bold text-slate-900 dark:text-white">${order.totalAmount}</div>
                   </div>
                   <div className="text-right">
                      <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Status</div>
                      <div className="text-sm font-medium text-slate-600 flex items-center gap-1 justify-end">
                         {order.status || 'Processing'}
                      </div>
                   </div>
                   <Button size="sm" variant="outline">View Details</Button>
                </div>
             </div>
          </Card>
        ))}
         {orders.length === 0 && (
             <div className="text-center text-slate-500 italic py-12">No orders found.</div>
         )}
      </div>
    </div>
  );
}
