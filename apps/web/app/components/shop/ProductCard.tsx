"use client";

import Link from "next/link";
import { ShoppingCart, Heart, Eye, ArrowUpRight } from "lucide-react";
import { Button, Badge } from "@mobile-shop/ui";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  category: string;
  condition?: string;
  stock?: number;
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col bg-white dark:bg-slate-900/40 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] hover:border-primary-500/30 overflow-hidden"
    >
      {/* Visual Container */}
      <div className="relative aspect-[4/5] overflow-hidden m-2 rounded-[2rem] bg-slate-50 dark:bg-slate-900">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-200 font-bold uppercase tracking-tighter text-4xl -rotate-12 opacity-30 select-none">
            {product.brand}
          </div>
        )}
        
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Badge className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-md text-[9px] font-black tracking-widest uppercase py-1 border-0 shadow-sm text-slate-900 dark:text-white">
                {product.category || 'Tech'}
            </Badge>
            {product.stock && product.stock < 10 && (
                <Badge className="bg-rose-500 text-white text-[9px] font-black tracking-widest uppercase py-1 border-0 shadow-lg shadow-rose-500/20">
                    Low Stock
                </Badge>
            )}
        </div>

        {/* Hover Actions Menu */}
        <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
            <div className="flex gap-3 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <Link href={`/shop/${product._id}`}>
                    <button className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all shadow-xl">
                        <Eye size={20} />
                    </button>
                </Link>
                <button 
                  onClick={() => addToCart(product)}
                  className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all shadow-xl"
                >
                    <ShoppingCart size={20} />
                </button>
                <button className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center hover:text-rose-500 transition-all shadow-xl">
                    <Heart size={20} />
                </button>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-2 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest">{product.brand}</span>
             <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700" />
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.condition || 'New'}</span>
          </div>
          <Link href={`/shop/${product._id}`} className="block">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors truncate tracking-tight pr-6 relative">
              {product.name}
              <ArrowUpRight size={14} className="absolute right-0 top-1.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
            </h3>
          </Link>
        </div>

        <div className="flex items-end justify-between">
           <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                ${product.price ? product.price.toLocaleString() : '0'}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through font-bold">
                    ${product.originalPrice.toLocaleString()}
                </span>
              )}
           </div>
           
           <button 
             onClick={() => addToCart(product)}
             className="px-5 py-2.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black uppercase tracking-widest transition-all hover:scale-[1.05] active:scale-95 shadow-lg shadow-slate-900/10 dark:shadow-none"
           >
             Add +
           </button>
        </div>
      </div>
    </motion.div>
  );
}
