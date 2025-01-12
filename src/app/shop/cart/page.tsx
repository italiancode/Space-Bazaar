"use client"; // Ensure this is a client component

import { useCart } from "@/contexts/CartContext"; // Import the useCart hook
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart } = useCart(); // Get cart and removeFromCart function

  return (
    <div className="py-24 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map(item => (
            <li key={item.id} className="flex justify-between items-center bg-white rounded-lg shadow-md p-4">
              <span>Product ID: {item.id}</span>
              <span>Quantity: {item.quantity}</span>
              <button 
                onClick={() => removeFromCart(item.id)} 
                className="bg-red-500 text-white rounded px-2 py-1"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-8 text-center">
        <Link href="/shop" className="inline-block bg-accent-blue text-white rounded-full px-4 py-2">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
} 