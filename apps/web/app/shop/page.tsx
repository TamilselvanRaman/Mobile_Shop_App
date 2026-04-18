import Link from "next/link";
import { Container, Button } from "@mobile-shop/ui";
import { FilterSidebar } from "../components/shop/FilterSidebar";
import { ProductCard } from "../components/shop/ProductCard";
import { Search, SlidersHorizontal, Package, Tag, ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic';

async function getProducts(searchParams: any) {
  try {
    const params = new URLSearchParams();
    if (searchParams.brand) params.append("brand", searchParams.brand);
    if (searchParams.category) params.append("category", searchParams.category);
    if (searchParams.minPrice) params.append("minPrice", searchParams.minPrice);
    if (searchParams.maxPrice) params.append("maxPrice", searchParams.maxPrice);
    if (searchParams.condition) params.append("condition", searchParams.condition);
    if (searchParams.search) params.append("search", searchParams.search);

    const res = await fetch(`http://localhost:5001/api/products?${params.toString()}`, { 
        cache: "no-store"
    });
    
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Failed to fetch products", e);
    return [];
  }
}

export default async function ShopPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const products = await getProducts(searchParams);

  return (
    <main className="bg-white dark:bg-slate-950 min-h-screen pt-24 pb-20">
      {/* Premium Header */}
      <div className="relative overflow-hidden mb-12 py-12 border-b border-slate-100 dark:border-slate-800">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-500/5 to-transparent pointer-events-none" />
        <Container>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500">
                <Package size={12} className="text-primary-600" />
                Collection 2024
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
                Premium <span className="text-gradient">Selection.</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl font-medium">
                Discover the world&apos;s most advanced mobile technology. Curated, certified, and ready for you.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full lg:w-[400px] group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors h-5 w-5" />
               <form action="/shop" method="GET">
                   <input 
                     name="search"
                     type="text" 
                     defaultValue={searchParams.search as string}
                     placeholder="Title, brand, or model..." 
                     className="w-full h-14 pl-12 pr-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-medium text-slate-900 dark:text-white"
                   />
               </form>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <FilterSidebar />

          {/* Product Grid */}
          <div className="flex-1">
             {products.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-20 text-center glass rounded-[3rem] p-12">
                   <div className="w-24 h-24 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-8 border border-slate-200 dark:border-slate-800">
                       <Search size={40} className="text-slate-300" />
                   </div>
                   <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">No match found</h3>
                   <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8 font-medium">
                       We couldn&apos;t find anything matching your criteria. Try loosening your filters or a different search term.
                   </p>
                   <Link href="/shop">
                      <Button className="rounded-2xl h-12 px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-none font-bold">
                        Clear all filters
                      </Button>
                   </Link>
               </div>
             ) : (
               <div className="space-y-12">
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                      {products.map((p: any) => (
                        <ProductCard key={p._id} product={p} />
                      ))}
                  </div>

                  {/* Pagination */}
                  <div className="pt-12 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                      <p className="text-sm font-bold text-slate-500">
                        Showing <span className="text-slate-900 dark:text-white">{products.length}</span> of <span className="text-slate-900 dark:text-white">{products.length}</span> products
                      </p>
                      <div className="flex items-center gap-2">
                         <Button variant="ghost" disabled className="rounded-xl px-4 py-2 font-bold opacity-50">Prev</Button>
                         <div className="flex gap-1">
                            {[1].map(n => (
                                <button key={n} className="w-10 h-10 rounded-xl bg-primary-600 text-white font-black text-sm shadow-lg shadow-primary-500/30">{n}</button>
                            ))}
                         </div>
                         <Button variant="ghost" className="rounded-xl px-4 py-2 font-bold hover:bg-slate-100 dark:hover:bg-slate-900">Next</Button>
                      </div>
                  </div>
               </div>
             )}
          </div>
        </div>
      </Container>
    </main>
  );
}

