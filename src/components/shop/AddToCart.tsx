"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface AddToCartProps {
  productId: number;
}

const AddToCart: React.FC<AddToCartProps> = ({ productId }) => {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addToCart(productId);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000); // Reset after 2 seconds
  };

  return (
    <div>
      <button 
        onClick={handleAddToCart}
        className="mt-2 bg-accent-blue text-white rounded-full px-4 py-2 cursor-pointer hover:bg-accent-blue/90"
      >
        Add to Cart
      </button>
      {addedToCart && <p className="mt-2 text-green-500">Product added to cart!</p>} {/* Notification */}
    </div>
  );
};

export default AddToCart; 