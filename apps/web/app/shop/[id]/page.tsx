import Link from "next/link";
import { Container, Button, Card, Badge } from "@mobile-shop/ui";
import { Star, Truck, ShieldCheck, ArrowLeft, Heart, Share2 } from "lucide-react";
import { notFound } from "next/navigation";

// Fetch single product data
async function getProduct(id: string) {
  try {
    const res = await fetch(`http://localhost:5001/products/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    return null;
  }
}

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
      // Fallback for mock data if backend not ready for specific ID
      if (params.id.startsWith("mock-")) {
          return <MockProductDetails id={params.id} />
      }
      return notFound();
  }

  return <ProductView product={product} />
}

function MockProductDetails({ id }: { id: string }) {
    // Temporary mock for visual testing without backend data
     const mockProduct = {
        _id: id,
        name: "iPhone 15 Pro Max",
        brand: "Apple",
        price: 1199,
        originalPrice: 1299,
        description: "The ultimate iPhone with titanium design, A17 Pro chip, and the most powerful camera system yet.",
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
        <Container className="py-8">
            <Link href="/shop" className="inline-flex items-center text-slate-500 hover:text-primary-600 mb-6 transition-colors">
                <ArrowLeft size={18} className="mr-2" /> Back to Shop
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image Gallery Section */}
                <div className="space-y-4">
                    <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800">
                         {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                        )}
                    </div>
                    {/* Thumbnails (Mock) */}
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {[1, 2, 3, 4].map(i => (
                             <div key={i} className="w-20 h-20 shrink-0 bg-slate-100 rounded-xl border border-slate-200 cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all"></div>
                        ))}
                    </div>
                </div>

                {/* Product Info Section */}
                <div>
                    <div className="flex items-start justify-between mb-4">
                        <div>
                           <div className="text-sm font-bold text-primary-600 uppercase tracking-wider mb-1">{product.brand}</div>
                            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">{product.name}</h1>
                             <div className="flex items-center gap-2">
                                <div className="flex text-yellow-500">
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" className="text-slate-300 dark:text-slate-700" />
                                </div>
                                <span className="text-sm text-slate-500">(124 reviews)</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0"><Heart size={20} /></Button>
                            <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0"><Share2 size={20} /></Button>
                        </div>
                    </div>

                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                        ${product.price}
                        {product.originalPrice && (
                            <span className="ml-3 text-xl text-slate-400 line-through font-normal">${product.originalPrice}</span>
                        )}
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                        {product.description || "Experience next-level performance with this device. Featuring a stunning display, all-day battery life, and pro-grade cameras."}
                    </p>

                    {/* Specifications / Variants */}
                    <div className="space-y-6 mb-8">
                        {/* Storage */}
                        <div>
                            <span className="block text-sm font-semibold mb-2">Storage</span>
                            <div className="flex gap-3">
                                {['128GB', '256GB', '512GB', '1TB'].map(s => (
                                    <button key={s} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all">
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                         {/* Color */}
                         <div>
                            <span className="block text-sm font-semibold mb-2">Color</span>
                             <div className="flex gap-3">
                                {['#333', '#f5f5dc', '#5a5a5a', '#3b82f6'].map(c => (
                                    <button key={c} className="w-8 h-8 rounded-full border border-slate-200 shadow-sm hover:scale-110 transition-transform" style={{ backgroundColor: c }}></button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 mb-8">
                        <Button size="lg" className="flex-1 text-lg h-14">Add to Cart</Button>
                        <Button size="lg" variant="secondary" className="flex-1 text-lg h-14">Buy Now</Button>
                    </div>

                    {/* Features/Trust */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                            <Truck className="text-primary-600" />
                            <div>
                                <div className="font-semibold text-sm">Free Delivery</div>
                                <div className="text-xs text-slate-500">On orders over $500</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                            <ShieldCheck className="text-primary-600" />
                            <div>
                                <div className="font-semibold text-sm">1 Year Warranty</div>
                                <div className="text-xs text-slate-500">Official manufacturer warranty</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
