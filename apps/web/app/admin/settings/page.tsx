"use client";

import React from 'react';
import { Card, Button, Input } from '@mobile-shop/ui';
import { Save, Bell, Shield, Store, Mail, MapPin, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
           <h1 className="text-3xl font-black text-white tracking-tight">System Settings</h1>
           <p className="text-slate-400 text-sm mt-1">Configure platform preferences and operational parameters.</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] border-none">
                <Save size={18} className="mr-2" /> Save Changes
            </Button>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: General & Store Info */}
          <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-0 border-slate-800/50 bg-slate-900/40 backdrop-blur-md overflow-hidden">
                    <div className="p-6 border-b border-slate-800/50 flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                            <Store size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-white">General Information</h3>
                            <p className="text-slate-500 text-xs">Basic store details and contacts.</p>
                        </div>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Shop Name</label>
                                <div className="relative">
                                    <Store size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <Input defaultValue="Local Mobile Shop" className="pl-10 bg-slate-900/50 border-slate-700/50 text-slate-200 focus:border-indigo-500/50 focus:ring-indigo-500/20" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Contact Email</label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <Input defaultValue="support@mobileshop.com" className="pl-10 bg-slate-900/50 border-slate-700/50 text-slate-200 focus:border-indigo-500/50 focus:ring-indigo-500/20" />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Address</label>
                            <div className="relative">
                                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                <Input defaultValue="123 Tech Street, Silicon Valley, CA" className="pl-10 bg-slate-900/50 border-slate-700/50 text-slate-200 focus:border-indigo-500/50 focus:ring-indigo-500/20" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Support Phone</label>
                            <div className="relative">
                                <Smartphone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                <Input defaultValue="+1 (555) 123-4567" className="pl-10 bg-slate-900/50 border-slate-700/50 text-slate-200 focus:border-indigo-500/50 focus:ring-indigo-500/20" />
                            </div>
                        </div>
                    </div>
                </Card>
              </motion.div>
          </div>

          {/* Right Column: Notifications & Security */}
          <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                  <Card className="p-0 border-slate-800/50 bg-slate-900/40 backdrop-blur-md overflow-hidden">
                     <div className="p-6 border-b border-slate-800/50 flex items-center gap-3">
                        <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                            <Bell size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-white">Notifications</h3>
                            <p className="text-slate-500 text-xs">Alert preferences.</p>
                        </div>
                     </div>
                     <div className="p-6 space-y-4">
                         {[
                             { label: 'Email on new order', desc: 'Get notified when a customer places an order.' },
                             { label: 'SMS on urgent repairs', desc: 'Receive alerts for high-priority tickets.' },
                             { label: 'Daily reports', desc: 'Summary of daily sales and activity.' }
                         ].map((item, i) => (
                             <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-800/30 transition-colors cursor-pointer group">
                                 <div className="pt-0.5">
                                     <input type="checkbox" className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900" defaultChecked />
                                 </div>
                                 <div>
                                     <label className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors block">{item.label}</label>
                                     <p className="text-xs text-slate-500">{item.desc}</p>
                                 </div>
                             </div>
                         ))}
                     </div>
                  </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                  <Card className="p-0 border-slate-800/50 bg-slate-900/40 backdrop-blur-md overflow-hidden">
                     <div className="p-6 border-b border-slate-800/50 flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                            <Shield size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-white">Security</h3>
                            <p className="text-slate-500 text-xs">2FA and sessions.</p>
                        </div>
                     </div>
                     <div className="p-6">
                        <Button variant="outline" className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                            Change Password
                        </Button>
                        <Button variant="outline" className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white mt-3">
                            Two-Factor Authentication
                        </Button>
                     </div>
                  </Card>
              </motion.div>
          </div>
      </div>
    </div>
  );
}
