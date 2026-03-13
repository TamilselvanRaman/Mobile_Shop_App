"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Save, Loader2 } from 'lucide-react';
import { Button, Input, Card } from '@mobile-shop/ui';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void;
}

export default function AddProductModal({ isOpen, onClose, onProductAdded }: AddProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    originalPrice: '',
    description: '',
    category: 'mobile',
    stock: '',
    image: '',
    isRefurbished: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Format data for API
      const productData = {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        stock: Number(formData.stock) || 0,
        images: formData.image ? [formData.image] : [], // Backend expects array of strings
        isRefurbished: formData.isRefurbished
      };

      const response = await fetch('http://localhost:5001/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      onProductAdded();
      onClose();
      // Reset form
      setFormData({
        name: '',
        brand: '',
        price: '',
        originalPrice: '',
        description: '',
        category: 'mobile',
        stock: '',
        image: '',
        isRefurbished: false
      });
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-2xl relative"
        >
          <div className="bg-slate-900 border border-slate-700 shadow-2xl rounded-xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900">
              <h2 className="text-xl font-bold text-white">Add New Product</h2>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
              <form id="add-product-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Product Name <span className="text-red-500">*</span></label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. iPhone 15 Pro"
                      required
                      className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Brand <span className="text-red-500">*</span></label>
                    <Input
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      placeholder="e.g. Apple"
                      required
                      className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full h-10 px-3 rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="mobile">Mobile Phone</option>
                      <option value="accessory">Accessory</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Stock Quantity</label>
                    <Input
                      name="stock"
                      type="number"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="0"
                      className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Price ($) <span className="text-red-500">*</span></label>
                    <Input
                      name="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      required
                      className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Original Price ($) <span className="text-slate-500 text-xs font-normal">(Optional)</span></label>
                    <Input
                      name="originalPrice"
                      type="number"
                      step="0.01"
                      value={formData.originalPrice}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Image URL</label>
                  <div className="flex gap-2">
                    <Input
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                    />
                  </div>
                  {formData.image && (
                    <div className="mt-2 h-20 w-20 rounded overflow-hidden border border-slate-700 bg-slate-800">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="h-full w-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Invalid+Image' }}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Description <span className="text-red-500">*</span></label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Product details..."
                    required
                    className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none placeholder-slate-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isRefurbished"
                    name="isRefurbished"
                    checked={formData.isRefurbished}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="isRefurbished" className="text-sm font-medium text-slate-300 select-none cursor-pointer">
                    This is a refurbished product
                  </label>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-slate-800 flex justify-end gap-3 bg-slate-900">
              <Button type="button" variant="outline" onClick={onClose} className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white" disabled={loading}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                form="add-product-form"
                className="bg-indigo-600 hover:bg-indigo-500 text-white border-0"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <Loader2 size={18} className="mr-2 animate-spin" /> Saving...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Save size={18} className="mr-2" /> Save Product
                  </div>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
