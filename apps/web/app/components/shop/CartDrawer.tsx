"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, CreditCard } from "lucide-react";
import { Button } from "@mobile-shop/ui";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export function CartDrawer() {
  const { cart, isOpen, setIsOpen, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[100]"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-slate-950 z-[110] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/30 flex items-center justify-center text-primary-600">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Your Cart</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{totalItems} Items selected</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-200 dark:text-slate-800">
                    <ShoppingBag size={40} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Empty Cart</h3>
                    <p className="text-sm font-medium text-slate-500 max-w-[200px] mx-auto">Looks like you haven&apos;t added any premium gear yet.</p>
                  </div>
                  <Button 
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl px-8 bg-primary-600 text-white border-none font-bold"
                  >
                    Start Shopping
                  </Button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item._id} className="flex gap-4 group">
                    <div className="w-24 h-24 rounded-2xl bg-slate-50 dark:bg-slate-900 overflow-hidden border border-slate-100 dark:border-slate-800 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <p className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em]">{item.brand}</p>
                          <h4 className="font-bold text-slate-900 dark:text-white truncate">{item.name}</h4>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item._id)}
                          className="p-1.5 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="flex items-end justify-between mt-auto">
                        <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900 rounded-lg p-1 border border-slate-100 dark:border-slate-800">
                          <button 
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-white dark:hover:bg-slate-800 rounded-md transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-black text-slate-900 dark:text-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-white dark:hover:bg-slate-800 rounded-md transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="font-black text-slate-900 dark:text-white">${(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <span>Shipping</span>
                    <span className="text-emerald-500 uppercase">Free</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-end">
                    <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">Total Amount</span>
                    <span className="text-2xl font-black text-primary-600">${totalPrice.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                    <Button className="w-full h-14 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-none font-black text-base shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                        Checkout Now <CreditCard size={18} className="ml-2" />
                    </Button>
                    <Link href="/cart" onClick={() => setIsOpen(false)} className="block">
                         <Button variant="ghost" className="w-full h-12 rounded-xl text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-slate-900">
                             View Full Cart
                         </Button>
                    </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
