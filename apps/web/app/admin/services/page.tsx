"use client";

import React, { useEffect, useState } from 'react';
import { Card, Button, Badge } from '@mobile-shop/ui';

interface Booking {
  _id: string;
  serviceId: { name: string } | null;
  customerName: string;
  deviceModel: string;
  issueDescription: string;
  status: 'pending' | 'in_progress' | 'completed' | 'ready';
  date: string;
  technician?: string;
}

export default function ServiceManagement() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/api/services/bookings')
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch bookings", err);
        setLoading(false);
      });
  }, []);

  const pending = bookings.filter(b => b.status === 'pending');
  const inProgress = bookings.filter(b => b.status === 'in_progress');
  const completed = bookings.filter(b => b.status === 'completed' || b.status === 'ready');

  if (loading) return <div className="p-8">Loading services...</div>;

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-black text-white tracking-tight">Service Management</h1>
           <p className="text-slate-400 text-sm mt-1">Manage repair tickets and technician assignments.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">Export</Button>
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] border-none">+ New Ticket</Button>
        </div>
      </div>
      
      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-w-[1000px] md:min-w-0">
            
            {/* Column: Pending */}
            <StatusColumn title="Pending Review" count={pending.length} color="border-orange-500/50">
            {pending.map(b => (
                <ServiceCard key={b._id} booking={b} />
            ))}
            {pending.length === 0 && <EmptyState label="No pending tickets" />}
            </StatusColumn>

            {/* Column: In Progress */}
            <StatusColumn title="In Progress" count={inProgress.length} color="border-blue-500/50">
            {inProgress.map(b => (
                <ServiceCard key={b._id} booking={b} />
            ))}
            {inProgress.length === 0 && <EmptyState label="No active repairs" />}
            </StatusColumn>

            {/* Column: Ready */}
            <StatusColumn title="Ready / Completed" count={completed.length} color="border-emerald-500/50">
            {completed.map(b => (
                <ServiceCard key={b._id} booking={b} />
            ))}
            {completed.length === 0 && <EmptyState label="No completed tickets" />}
            </StatusColumn>

        </div>
      </div>
    </div>
  );
}

function StatusColumn({ title, count, children, color }: any) {
  return (
    <div className={`bg-slate-900/40 backdrop-blur-md rounded-xl flex flex-col h-full border-t-4 ${color} shadow-xl border-x border-b border-slate-800/50`}>
       <div className="flex justify-between items-center p-4 border-b border-slate-800/50 bg-slate-900/50 rounded-t-lg">
         <h3 className="font-bold text-white text-sm uppercase tracking-wide">{title}</h3>
         <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full text-xs font-bold ring-1 ring-slate-700">{count}</span>
       </div>
       <div className="p-3 space-y-3 overflow-y-auto flex-1 h-0 custom-scrollbar">
         {children}
       </div>
    </div>
  )
}

function ServiceCard({ booking }: { booking: Booking }) {
  return (
    <Card className="p-3 hover:bg-slate-800/50 transition-all cursor-pointer bg-slate-900/80 border-slate-800/80 group hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10">
       <div className="flex justify-between items-start mb-2">
         <Badge variant="outline" className="text-[10px] text-slate-400 border-slate-700 bg-slate-800/50">#{booking._id.slice(-6)}</Badge>
         <span className="text-[10px] text-slate-500 font-medium">{new Date(booking.date).toLocaleDateString()}</span>
       </div>
       <div className="font-bold text-slate-200 text-sm mb-0.5 group-hover:text-white transition-colors">{booking.deviceModel}</div>
       <div className="text-xs text-slate-500 mb-3 line-clamp-2 group-hover:text-slate-400">{booking.issueDescription}</div>
       
       <div className="flex justify-between items-center mt-2 border-t border-slate-800 pt-2">
          <div className="flex items-center gap-1.5">
             <div className="h-4 w-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[8px] font-bold text-white shadow-sm">
                {booking.customerName.charAt(0)}
             </div>
             <div className="text-xs font-medium text-slate-400 group-hover:text-slate-300">{booking.customerName}</div>
          </div>
          {booking.technician && (
              <div className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded font-bold border border-blue-500/20">
                 {booking.technician}
              </div>
          )}
       </div>
    </Card>
  )
}

function EmptyState({ label }: { label: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-8 text-center h-full border-2 border-dashed border-slate-800/50 rounded-lg bg-slate-900/20">
            <span className="text-2xl mb-2 opacity-20 grayscale">📂</span>
            <p className="text-slate-500 text-xs font-medium">{label}</p>
        </div>
    )
}
