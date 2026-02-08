import Link from "next/link";
import { Container, Button } from "@mobile-shop/ui";
import { FilterSidebar } from "../components/shop/FilterSidebar";
import { ProductCard } from "../components/shop/ProductCard";
import { Search } from "lucide-react";

// Server action to fetch products
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
        cache: "no-store",
        next: { tags: ['products'] } 
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
    <Container className="py-8 bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Shop Devices</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Browse our collection of premium smartphones & gear.</p>
        </div>
        
        {/* Search Bar - Note: In a real app, this should be a client component that syncs to URL 'search' param */}
        <div className="relative w-full md:w-96 group">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors h-5 w-5" />
           <form action="/shop" method="GET">
               <input 
                 name="search"
                 type="text" 
                 defaultValue={searchParams.search as string}
                 placeholder="Search by name, brand, or model..." 
                 className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all shadow-sm group-hover:shadow-md"
               />
           </form>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 relative">
        {/* Sidebar */}
        <FilterSidebar />

        {/* Product Grid */}
        <div className="flex-1">
           {products.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-20 text-center">
                 <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                     <Search size={40} className="text-slate-400" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No products found</h3>
                 <p className="text-slate-500 max-w-md mx-auto mb-6">
                     We couldn't find any products matching your filters. Try adjusting your search or clearing filters.
                 </p>
                 <Link href="/shop">
                    <Button variant="outline">Clear Filters</Button>
                 </Link>
             </div>
           ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {products.map((p: any) => (
                   <ProductCard key={p._id} product={p} />
                 ))}
             </div>
           )}
           
           {/* Pagination - Placeholder for now */}
           {products.length > 0 && (
             <div className="mt-16 flex justify-center gap-2">
                <Button variant="outline" disabled>Previous</Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
             </div>
           )}
        </div>
      </div>
    </Container>
  );
}
