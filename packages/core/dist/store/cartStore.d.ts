import { Product } from "../types";
export interface CartItem extends Product {
    quantity: number;
}
interface CartState {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    total: () => number;
}
export declare const useCartStore: import("zustand").UseBoundStore<import("zustand").StoreApi<CartState>>;
export {};
