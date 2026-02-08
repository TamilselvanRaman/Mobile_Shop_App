"use client";

import React, { useEffect, useState } from 'react';
import { Card, Button, Input } from '@mobile-shop/ui';
import { Search, Plus, Filter, Package, Tag, Layers, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock?: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5001/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product => 
     product.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-slate-400 p-8">Loading inventory...</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-3xl font-black text-white tracking-tight">Products & Inventory</h1>
           <p className="text-slate-400 text-sm mt-1">Manage physical stock and master catalog.</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
             <Button className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] border-none">
                <Plus size={18} className="mr-2" /> Add Product
            </Button>
        </motion.div>
      </div>

      <Card className="border-slate-800/50 shadow-xl overflow-hidden p-0 bg-slate-900/40 backdrop-blur-md">
         {/* Toolbar */}
         <div className="p-4 border-b border-slate-800/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-96">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <Input 
                    placeholder="Search products by name or category..." 
                    className="pl-10 bg-slate-900/50 border-slate-700/50 text-slate-200 placeholder:text-slate-600 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                    <Filter size={16} className="mr-2" /> Filter
                </Button>
            </div>
         </div>
         
         {/* Table */}
         <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-400 uppercase bg-slate-900/60 border-b border-slate-800/50">
                   <tr>
                      <th className="px-6 py-4 font-semibold tracking-wider">Product Name</th>
                      <th className="px-6 py-4 font-semibold tracking-wider">Category</th>
                      <th className="px-6 py-4 font-semibold tracking-wider">Stock</th>
                      <th className="px-6 py-4 font-semibold tracking-wider">Price</th>
                      <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                      <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                   {filteredProducts.map((product, index) => (
                      <motion.tr 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        key={product._id} 
                        className="hover:bg-slate-800/30 transition-colors group"
                      >
                         <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                               <div className="h-10 w-10 rounded-lg bg-slate-800 overflow-hidden border border-slate-700/50">
                                   {product.image ? (
                                     <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                   ) : (
                                     <div className="h-full w-full flex items-center justify-center text-slate-600"><Package size={16} /></div>
                                   )}
                               </div>
                               <span className="font-medium text-slate-200 group-hover:text-white transition-colors">{product.name}</span>
                            </div>
                         </td>
                         <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5 text-slate-400">
                                <Layers size={14} />
                                {product.category}
                            </div>
                         </td>
                         <td className="px-6 py-4 text-slate-400">
                             {product.stock || 24} {/* Mock stock if not in DB */}
                         </td> 
                         <td className="px-6 py-4 font-bold text-slate-200">
                             ${product.price}
                         </td>
                         <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                               Active
                            </span>
                         </td>
                         <td className="px-6 py-4 text-right">
                            <button className="text-slate-500 hover:text-white p-2 hover:bg-slate-700/50 rounded-lg transition-all">
                                <MoreVertical size={16} />
                            </button>
                         </td>
                      </motion.tr>
                   ))}
                   {filteredProducts.length === 0 && (
                       <tr>
                           <td colSpan={6} className="px-6 py-12 text-center text-slate-500 italic">No products found.</td>
                       </tr>
                   )}
                </tbody>
             </table>
         </div>
      </Card>
    </div>
  );
}
