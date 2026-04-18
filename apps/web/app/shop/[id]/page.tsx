import Link from "next/link";
import { Container, Button, Badge } from "@mobile-shop/ui";
import { Star, Truck, ShieldCheck, ArrowLeft, Heart, Share2, Info, ChevronRight, Zap } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

async function getProduct(id: string) {
  try {
    const res = await fetch(`http://localhost:5001/api/products/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    return null;
  }
}

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
      if (params.id.startsWith("mock-")) {
          return <MockProductDetails id={params.id} />
      }
      return notFound();
  }

  return <ProductView product={product} />
}

function MockProductDetails({ id }: { id: string }) {
     const mockProduct = {
        _id: id,
        name: "iPhone 15 Pro Max",
        brand: "Apple",
        price: 1199,
        originalPrice: 1299,
        category: "Smartphone",
        description: "The ultimate iPhone with titanium design, A17 Pro chip, and the most powerful camera system yet. Built for creators, professionals, and everyone who demands the best from their mobile devices.",
        image: "https://images.unsplash.com/photo-1696446702378-d50d34988e40?q=80&w=1000&auto=format&fit=crop",
        specs: { "Storage": "256GB", "Color": "Natural Titanium", "Screen": "6.7 inch OLED" },
        stock: 5,
        rating: 4.8,
        reviews: 124
     };
     return <ProductView product={mockProduct} />
}

function ProductView({ product }: { product: any }) {
    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20">
            <Container>
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 mb-12 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <Link href="/shop" className="hover:text-primary-600 transition-colors">Shop</Link>
                    <ChevronRight size={10} />
                    <span className="text-slate-300 dark:text-slate-700">{product.brand}</span>
                    <ChevronRight size={10} />
                    <span className="text-slate-900 dark:text-white truncate max-w-[150px]">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Visuals - 7/12 width */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="group relative aspect-square sm:aspect-[4/3] bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-2xl">
                             {product.image ? (
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300 font-black text-6xl opacity-20 uppercase -rotate-12">No Preview</div>
                            )}
                            
                            {/* Badges Overlay */}
                            <div className="absolute top-8 left-8 flex flex-col gap-3">
                                <Badge className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-md text-slate-900 dark:text-white border-0 px-4 py-2 rounded-full font-black text-[10px] shadow-xl">
                                    IN STOCK
                                </Badge>
                                <Badge className="bg-primary-600 text-white border-0 px-4 py-2 rounded-full font-black text-[10px] shadow-xl shadow-primary-500/30">
                                    TOP RATED
                                </Badge>
                            </div>
                        </div>

                        {/* Feature Points */}
                        <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="aspect-square rounded-3xl bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center">
                                        <Zap size={20} className="text-primary-600" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Content - 5/12 width */}
                    <div className="lg:col-span-5 flex flex-col h-full">
                        <div className="space-y-8">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-[10px] font-black text-primary-600 uppercase tracking-[0.3em]">{product.brand}</span>
                                    <div className="w-8 h-[1px] bg-slate-200 dark:bg-slate-800" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.category}</span>
                                </div>
                                <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tight">
                                    {product.name}
                                </h1>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <Star key={i} size={14} className={i <= 4 ? "text-amber-400" : "text-slate-200 dark:text-slate-800"} fill={i <= 4 ? "currentColor" : "none"} />
                                        ))}
                                    </div>
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{product.reviews || 0} REVIEWS</span>
                                </div>
                            </div>

                            <div className="flex items-baseline gap-4">
                                <span className="text-5xl font-black text-slate-900 dark:text-white">
                                    ${product.price.toLocaleString()}
                                </span>
                                {product.originalPrice && (
                                    <span className="text-xl text-slate-400 line-through font-bold">
                                        ${product.originalPrice.toLocaleString()}
                                    </span>
                                )}
                            </div>

                            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                {product.description || "Unleash the future of mobile excellence. Engineered for those who demand uncompromising performance, sleek aesthetics, and revolutionary technology."}
                            </p>

                            {/* Options Mock */}
                            <div className="space-y-6 py-8 border-y border-slate-100 dark:border-slate-900">
                                <div>
                                    <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-4 block">Select Configuration</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['256GB', '512GB', '1TB'].map((v, i) => (
                                            <button key={v} className={`px-6 py-3 rounded-2xl text-xs font-black border-2 transition-all ${i === 0 ? 'border-primary-600 bg-primary-50/50 dark:bg-primary-950/20 text-primary-600' : 'border-slate-100 dark:border-slate-800 text-slate-500 hover:border-slate-200'}`}>
                                                {v}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-4 block">Choose Color</label>
                                    <div className="flex gap-3">
                                        {['#1a1a1a', '#e2e2e2', '#d4af37', '#4682b4'].map((c, i) => (
                                            <button key={c} className={`w-10 h-10 rounded-full border-4 ${i === 0 ? 'border-primary-600 ring-4 ring-primary-500/10' : 'border-slate-100 dark:border-slate-800'} transition-all`} style={{ backgroundColor: c }} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4 pt-4">
                                <Button className="flex-[2] h-16 rounded-[1.25rem] bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-none font-black text-lg shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">
                                    Add to Cart
                                </Button>
                                <Button variant="secondary" className="w-16 h-16 rounded-[1.25rem] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex items-center justify-center p-0 hover:border-rose-500 hover:text-rose-500 transition-all">
                                    <Heart size={24} />
                                </Button>
                            </div>

                            {/* Trust badges */}
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div className="flex items-center gap-3 p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center">
                                        <Truck size={18} className="text-primary-600" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black uppercase text-slate-900 dark:text-white mb-0.5">Express</div>
                                        <div className="text-[10px] font-bold text-slate-400">NEXT DAY</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center">
                                        <ShieldCheck size={18} className="text-primary-600" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black uppercase text-slate-900 dark:text-white mb-0.5">Secure</div>
                                        <div className="text-[10px] font-bold text-slate-400">2Y WARRANTY</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}

