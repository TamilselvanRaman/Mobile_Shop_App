export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: "mobile" | "accessory";
  stock: number;
  specs: Record<string, string>;
  isRefurbished?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductInput = Omit<Product, "id" | "createdAt" | "updatedAt">;
