"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, SlidersHorizontal, X, Check } from "lucide-react";
import { Button, Card } from "@mobile-shop/ui";

const FILTERS = {
  brands: ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi'],
  conditions: ['New Sealed', 'Open Box', 'Refurbished', 'Used'],
  categories: ['Smartphone', 'Tablet', 'Wearable', 'Accessories']
};

export function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  
  // Local state for immediate UI feedback, synced with URL
  const [filters, setFilters] = useState({
    brand: searchParams.getAll("brand"),
    condition: searchParams.getAll("condition"),
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  // Sync state with URL updates
  useEffect(() => {
     setFilters({
        brand: searchParams.get("brand")?.split(",") || [],
        condition: searchParams.get("condition")?.split(",") || [],
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
     });
  }, [searchParams]);

  const updateFilters = (newFilters: any) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newFilters.brand.length) params.set("brand", newFilters.brand.join(","));
    else params.delete("brand");

    if (newFilters.condition.length) params.set("condition", newFilters.condition.join(","));
    else params.delete("condition");

    if (newFilters.minPrice) params.set("minPrice", newFilters.minPrice);
    else params.delete("minPrice");

    if (newFilters.maxPrice) params.set("maxPrice", newFilters.maxPrice);
    else params.delete("maxPrice");

    // Reset page on filter change
    params.delete("page");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const toggleFilter = (type: 'brand' | 'condition', value: string) => {
    const current = [...filters[type]];
    const updated = current.includes(value) 
      ? current.filter(item => item !== value)
      : [...current, value];
    
    const newFilters = { ...filters, [type]: updated };
    setFilters(newFilters);
    updateFilters(newFilters);
  };

  const handlePriceChange = (type: 'minPrice' | 'maxPrice', value: string) => {
      const newFilters = { ...filters, [type]: value };
      setFilters(newFilters);
      // Debounce could be added here, but for now apply on blur or enter? 
      // Let's apply immediately for simple text inputs or add a "Apply" button for price.
      // For smoothness, let's just update on blur or have a button.
  };

  const applyPrice = () => {
      updateFilters(filters);
  };

  return (
    <>
      <Button 
        variant="outline" 
        className="md:hidden w-full mb-4 gap-2"
        onClick={() => setIsOpen(true)}
      >
        <SlidersHorizontal size={16} /> Filters
      </Button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black/50 z-50 md:hidden"
             onClick={() => setIsOpen(false)}
           />
        )}
      </AnimatePresence>

      <motion.div 
        className={`fixed md:sticky top-0 md:top-24 h-full md:h-[calc(100vh-7rem)] w-[280px] md:w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r md:border border-slate-200 dark:border-slate-800 z-50 md:z-40 transition-transform duration-300 ease-in-out md:translate-x-0 overflow-y-auto ${
            isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 space-y-8">
            <div className="flex items-center justify-between md:hidden">
                <h2 className="text-xl font-bold dark:text-white">Filters</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}><X size={20}/></Button>
            </div>

            <FilterSection title="Brands" expanded>
                <div className="space-y-2">
                    {FILTERS.brands.map(brand => (
                        <label key={brand} className="flex items-center gap-3 cursor-pointer group select-none">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                filters.brand.includes(brand) 
                                ? 'bg-indigo-600 border-indigo-600' 
                                : 'border-slate-300 dark:border-slate-600 group-hover:border-indigo-500'
                            }`}>
                                {filters.brand.includes(brand) && <Check size={12} className="text-white" />}
                            </div>
                            <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{brand}</span>
                        </label>
                    ))}
                </div>
            </FilterSection>

            <FilterSection title="Price Range" expanded>
                <div className="space-y-4">
                    <div className="flex gap-2">
                        <input 
                            type="number" 
                            placeholder="Min" 
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border-none text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                            value={filters.minPrice}
                            onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                        />
                        <input 
                            type="number" 
                            placeholder="Max" 
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border-none text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                            value={filters.maxPrice}
                            onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                        />
                    </div>
                    <Button size="sm" className="w-full" onClick={applyPrice}>Apply Range</Button>
                </div>
            </FilterSection>

             <FilterSection title="Condition">
                <div className="space-y-2">
                    {FILTERS.conditions.map(cond => (
                        <label key={cond} className="flex items-center gap-3 cursor-pointer group select-none">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                filters.condition.includes(cond) 
                                ? 'bg-indigo-600 border-indigo-600' 
                                : 'border-slate-300 dark:border-slate-600 group-hover:border-indigo-500'
                            }`}>
                                {filters.condition.includes(cond) && <Check size={12} className="text-white" />}
                            </div>
                            <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{cond}</span>
                        </label>
                    ))}
                </div>
            </FilterSection>
        </div>
      </motion.div>
    </>
  );
}

function FilterSection({ title, children, expanded = false }: { title: string, children: React.ReactNode, expanded?: boolean }) {
    const [isOpen, setIsOpen] = useState(expanded);

    return (
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full font-semibold text-slate-900 dark:text-white mb-2 group"
            >
                {title}
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''} group-hover:text-indigo-500`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-2">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
