"use client";

import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";

interface AddToCartProps {
  productId: number;
}

const AddToCart: React.FC<AddToCartProps> = ({ productId }) => {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addToCart(productId);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="relative">
      <button 
        onClick={handleAddToCart}
        className="group inline-flex items-center justify-center gap-2 
          bg-gradient-to-r from-accent-blue to-accent-purple
          hover:from-accent-purple hover:to-accent-blue
          text-white rounded-full px-6 py-2 
          transition-all duration-300 transform hover:scale-105
          shadow-[0_0_10px_rgba(79,70,229,0.3)] 
          hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]
          mx-auto"
      >
        <ShoppingCart className="w-5 h-5 transition-transform group-hover:rotate-12" />
        <span className="whitespace-nowrap">Add to Cart</span>
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
};

export default AddToCart; 