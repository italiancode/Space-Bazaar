"use client";

import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";

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
    <div className={`relative ${className}`}>
      <button
        onClick={handleAddToCart}
        disabled={disabled}
        className="w-full min-w-[120px] whitespace-nowrap bg-gradient-to-r from-accent-blue to-accent-purple 
          hover:from-accent-purple hover:to-accent-blue
          text-white rounded-lg px-4 py-2
          transition-all duration-300 transform hover:scale-[1.02]
          disabled:opacity-50 disabled:cursor-not-allowed
          disabled:hover:scale-100"
      >
        <span className="flex items-center justify-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          {disabled ? "Out of Stock" : "Add to Cart"}
        </span>
      </button>
      
      {addedToCart && (
        <div className="absolute -top-10 left-0 right-0 text-center">
          <p className="inline-block bg-green-500/90 text-white text-sm px-3 py-1 rounded-full 
            backdrop-blur-sm shadow-lg animate-fade-in-down">
            Added to cart!
          </p>
        </div>
      )}
    </div>
  );
} 