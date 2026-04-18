"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, SlidersHorizontal, X, Check, Search, RotateCcw } from "lucide-react";
import { Button } from "@mobile-shop/ui";
import { cn } from "@/lib/utils";

const FILTERS = {
  brands: ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi'],
  conditions: ['New Sealed', 'Open Box', 'Refurbished', 'Used'],
  categories: ['Smartphone', 'Tablet', 'Wearable', 'Accessories']
};

export function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    brand: searchParams?.get("brand")?.split(",").filter(Boolean) || [],
    condition: searchParams?.get("condition")?.split(",").filter(Boolean) || [],
    minPrice: searchParams?.get("minPrice") || "",
    maxPrice: searchParams?.get("maxPrice") || "",
  });

  useEffect(() => {
     setFilters({
        brand: searchParams?.get("brand")?.split(",").filter(Boolean) || [],
        condition: searchParams?.get("condition")?.split(",").filter(Boolean) || [],
        minPrice: searchParams?.get("minPrice") || "",
        maxPrice: searchParams?.get("maxPrice") || "",
     });
  }, [searchParams]);

  const updateFilters = (newFilters: any) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    
    if (newFilters.brand.length) params.set("brand", newFilters.brand.join(","));
    else params.delete("brand");

    if (newFilters.condition.length) params.set("condition", newFilters.condition.join(","));
    else params.delete("condition");

    if (newFilters.minPrice) params.set("minPrice", newFilters.minPrice);
    else params.delete("minPrice");

    if (newFilters.maxPrice) params.set("maxPrice", newFilters.maxPrice);
    else params.delete("maxPrice");

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
      setFilters(prev => ({ ...prev, [type]: value }));
  };

  const resetFilters = () => {
      router.push('/shop');
  };

  const FilterContent = (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950 p-6 md:p-0">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-primary-600" />
                Filters
            </h2>
            <button 
                onClick={resetFilters}
                className="text-xs font-bold text-slate-400 hover:text-primary-600 transition-colors flex items-center gap-1"
            >
                <RotateCcw size={12} /> Reset
            </button>
        </div>

        <div className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <FilterSection title="Brands" expanded>
                <div className="grid grid-cols-1 gap-2">
                    {FILTERS.brands.map(brand => (
                        <FilterItem 
                            key={brand}
                            label={brand}
                            active={filters.brand.includes(brand)}
                            onClick={() => toggleFilter('brand', brand)}
                        />
                    ))}
                </div>
            </FilterSection>

            <FilterSection title="Budget">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="flex-1 relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">$</span>
                            <input 
                                type="number" 
                                placeholder="Min" 
                                className="w-full pl-6 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                value={filters.minPrice}
                                onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                            />
                        </div>
                        <div className="w-2 h-px bg-slate-300 dark:bg-slate-700" />
                        <div className="flex-1 relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">$</span>
                            <input 
                                type="number" 
                                placeholder="Max" 
                                className="w-full pl-6 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                value={filters.maxPrice}
                                onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                            />
                        </div>
                    </div>
                    <Button 
                        size="sm" 
                        className="w-full rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-none font-bold" 
                        onClick={() => updateFilters(filters)}
                    >
                        Apply Range
                    </Button>
                </div>
            </FilterSection>

             <FilterSection title="Condition">
                <div className="grid grid-cols-1 gap-2">
                    {FILTERS.conditions.map(cond => (
                        <FilterItem 
                            key={cond}
                            label={cond}
                            active={filters.condition.includes(cond)}
                            onClick={() => toggleFilter('condition', cond)}
                        />
                    ))}
                </div>
            </FilterSection>
        </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden sticky top-24 z-30 mb-6 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md p-2 rounded-2xl border border-slate-200 dark:border-slate-800 flex gap-2">
        <Button 
            className="flex-1 h-12 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-none font-bold gap-2"
            onClick={() => setIsOpen(true)}
        >
            <SlidersHorizontal size={16} /> Filters
        </Button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
            <>
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[60] md:hidden"
                    onClick={() => setIsOpen(false)}
                />
                <motion.div 
                    initial={{ x: "-100%" }} 
                    animate={{ x: 0 }} 
                    exit={{ x: "-100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed top-0 left-0 bottom-0 w-[85%] max-w-xs bg-white dark:bg-slate-950 z-[70] md:hidden shadow-2xl overflow-y-auto"
                >
                    <div className="sticky top-0 right-0 p-4 flex justify-end">
                        <button onClick={() => setIsOpen(false)} className="p-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-500"><X size={20} /></button>
                    </div>
                    <div className="px-6 pb-12">{FilterContent}</div>
                </motion.div>
            </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 shrink-0">
          <div className="sticky top-32">
            {FilterContent}
          </div>
      </div>
    </>
  );
}

function FilterItem({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
    return (
        <button 
            onClick={onClick}
            className={cn(
                "group flex items-center justify-between p-3 rounded-xl border transition-all duration-300",
                active 
                    ? "bg-primary-50 dark:bg-primary-950/30 border-primary-500/50 text-primary-600 dark:text-primary-400" 
                    : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
            )}
        >
            <span className="text-sm font-bold">{label}</span>
            <div className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center transition-all",
                active ? "bg-primary-600 text-white scale-110" : "bg-slate-100 dark:bg-slate-800 text-transparent"
            )}>
                <Check size={12} strokeWidth={4} />
            </div>
        </button>
    )
}

function FilterSection({ title, children, expanded = false }: { title: string, children: React.ReactNode, expanded?: boolean }) {
    const [isOpen, setIsOpen] = useState(expanded);

    return (
        <div className="space-y-4">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600 transition-colors hover:text-primary-600"
            >
                {title}
                <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", isOpen ? "rotate-180" : "")} />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pb-2">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

