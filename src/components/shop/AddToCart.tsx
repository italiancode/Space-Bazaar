"use client";

import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

interface AddToCartProps {
  productId: number;
  quantity: number;
  disabled?: boolean;
  className?: string;
}

export default function AddToCart({ productId, quantity, disabled, className }: AddToCartProps) {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addToCart(productId, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={disabled}
      className={`bg-accent-purple text-white rounded-md px-2 py-1 text-sm transition-opacity duration-200 hover:opacity-90 disabled:opacity-50 ${className}`}
    >
      {addedToCart ? "Added!" : "Add to Cart"}
    </button>
  );
} 