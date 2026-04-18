"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "../Footer";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "../shop/CartDrawer";

export function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <CartProvider>
        {!isAdmin && <Navbar />}
        <main className={!isAdmin ? "flex-1 pt-0" : ""}>
          {children}
        </main>
        {!isAdmin && <Footer />}
        {!isAdmin && <CartDrawer />}
      </CartProvider>
  );
}

