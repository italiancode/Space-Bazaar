"use client";

import { AuthProvider } from "./AuthProvider";
import { CartProvider } from "@/contexts/CartContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </CartProvider>
  );
}
