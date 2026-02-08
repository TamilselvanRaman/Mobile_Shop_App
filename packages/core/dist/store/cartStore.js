"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCartStore = void 0;
const zustand_1 = require("zustand");
exports.useCartStore = (0, zustand_1.create)((set, get) => ({
    items: [],
    addItem: (product) => set((state) => {
        const existingItem = state.items.find((item) => item.id === product.id);
        if (existingItem) {
            return {
                items: state.items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item),
            };
        }
        return { items: [...state.items, { ...product, quantity: 1 }] };
    }),
    removeItem: (productId) => set((state) => ({
        items: state.items.filter((item) => item.id !== productId),
    })),
    updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map((item) => item.id === productId ? { ...item, quantity } : item),
    })),
    clearCart: () => set({ items: [] }),
    total: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
}));
