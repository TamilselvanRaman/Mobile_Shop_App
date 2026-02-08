import React from "react";
import { Card, Button, Badge } from "@mobile-shop/ui";
import { ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  category: string;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex gap-2">
        {product.isNew && <Badge variant="default" className="bg-primary-600">New</Badge>}
        {product.originalPrice && (
          <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </Badge>
        )}
      </div>

      {/* Image Area */}
      <div className="relative aspect-[4/5] bg-slate-100 dark:bg-slate-800 overflow-hidden">
         {/* Placeholder for now using generic image if no URL */}
         <div className="absolute inset-0 flex items-center justify-center text-slate-300">
            {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
                <div className="w-20 h-32 bg-slate-200 rounded-md"></div>
            )}
         </div>
         
         {/* Quick Actions (Hover) */}
         <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
            <Button size="sm" variant="secondary" className="rounded-full w-10 h-10 p-0 shadow-lg">
               <Heart size={18} />
            </Button>
            <Button size="sm" className="rounded-full shadow-lg gap-2">
               <ShoppingCart size={16} /> Add 
            </Button>
         </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-semibold">{product.brand}</div>
        <Link href={`/shop/${product._id}`} className="block">
           <h3 className="font-bold text-slate-900 dark:text-white mb-2 truncate group-hover:text-primary-600 transition-colors">
              {product.name}
           </h3>
        </Link>
        <div className="flex items-end justify-between">
           <div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">${product.price}</div>
              {product.originalPrice && (
                 <div className="text-sm text-slate-400 line-through">${product.originalPrice}</div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
