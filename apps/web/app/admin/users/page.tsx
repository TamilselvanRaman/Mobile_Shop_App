"use client";

import React, { useEffect, useState } from 'react';
import { Card, Button, Input } from '@mobile-shop/ui';
import { Search, Filter, MoreVertical, Shield, Mail, Calendar, User as UserIcon, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };
        
        fetch('http://localhost:5001/api/auth/users', { headers })
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch users", err);
                setLoading(false);
            });
    }, []);

    const filteredUsers = users.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="text-slate-400 p-8">Loading users...</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-3xl font-black text-white tracking-tight">User Management</h1>
           <p className="text-slate-400 text-sm mt-1">Manage system access and customer accounts.</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] border-none">
                <Plus size={18} className="mr-2" /> Invite User
            </Button>
        </motion.div>
      </div>

      <Card className="border-slate-800/50 shadow-xl overflow-hidden p-0 bg-slate-900/40 backdrop-blur-md">
         {/* Toolbar */}
         <div className="p-4 border-b border-slate-800/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-96">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <Input 
                    placeholder="Search users by name or email..." 
                    className="pl-10 bg-slate-900/50 border-slate-700/50 text-slate-200 placeholder:text-slate-600 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                    <Filter size={16} className="mr-2" /> Filter
                </Button>
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                    Export
                </Button>
            </div>
         </div>

         {/* Table */}
         <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-400 uppercase bg-slate-900/60 border-b border-slate-800/50">
                   <tr>
                      <th className="px-6 py-4 font-semibold tracking-wider">User</th>
                      <th className="px-6 py-4 font-semibold tracking-wider">Role</th>
                      <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                      <th className="px-6 py-4 font-semibold tracking-wider">Joined</th>
                      <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                   {filteredUsers.map((user, index) => (
                      <motion.tr 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        key={user._id} 
                        className="hover:bg-slate-800/30 transition-colors group"
                      >
                         <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                               <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/50 flex items-center justify-center font-bold text-sm text-slate-300 shadow-inner">
                                   {user.name ? user.name.charAt(0).toUpperCase() : <UserIcon size={16} />}
                               </div>
                               <div>
                                  <div className="font-medium text-slate-200 group-hover:text-white transition-colors">{user.name || 'Unknown'}</div>
                                  <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                    <Mail size={10} /> {user.email}
                                  </div>
                               </div>
                            </div>
                         </td>
                         <td className="px-6 py-4">
                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                 user.role === 'admin' 
                                    ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' 
                                    : 'bg-slate-800 text-slate-400 border-slate-700'
                             }`}>
                                {user.role === 'admin' && <Shield size={10} className="mr-1" />}
                                {user.role || 'customer'}
                             </span>
                         </td>
                         <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                               Active
                            </span>
                         </td>
                         <td className="px-6 py-4 text-slate-500">
                             <div className="flex items-center gap-2">
                                 <Calendar size={14} className="opacity-70" />
                                 {new Date(user.createdAt).toLocaleDateString()}
                             </div>
                         </td>
                         <td className="px-6 py-4 text-right">
                            <button className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700/50 transition-all">
                                <MoreVertical size={16} />
                            </button>
                         </td>
                      </motion.tr>
                   ))}
                   {filteredUsers.length === 0 && (
                       <tr>
                           <td colSpan={5} className="px-6 py-12 text-center text-slate-500 italic">
                               No users found matching "{searchTerm}".
                           </td>
                       </tr>
                   )}
                </tbody>
             </table>
         </div>
      </Card>
    </div>
  );
}
