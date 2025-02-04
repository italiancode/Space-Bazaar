"use client"; // Ensure this is a client component

import { useCart } from "@/contexts/CartContext"; // Import the useCart hook
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ArrowLeft, Trash2, Plus, Minus } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart(); // Get cart and removeFromCart function
  
  const subtotal = cart.reduce((total, item) => 
    total + ((item?.price || 0) * (item?.quantity || 0)), 0);
  const shipping = 4.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">
            Your Space Cart
          </h1>
          <p className="text-gray-400 mt-2">
            {cart.length} item{cart.length !== 1 ? 's' : ''} ready for launch
          </p>
        </motion.div>

        {cart.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <h2 className="text-xl text-gray-400 mb-8">Your cart is empty</h2>
            <Link 
              href="/shop" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-blue to-accent-purple
                hover:from-accent-purple hover:to-accent-blue text-white rounded-full px-6 py-3
                transition-all duration-300 transform hover:scale-105
                shadow-[0_0_10px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50
                      backdrop-blur-md rounded-xl overflow-hidden border border-gray-700/50
                      hover:border-indigo-500/50 transition-all duration-300"
                  >
                    <div className="flex items-center p-4 gap-4">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white truncate">
                          {item.name}
                        </h3>
                        <p className="text-indigo-400 font-mono">
                          ${(item?.price || 0).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50
                backdrop-blur-md rounded-xl border border-gray-700/50
                p-6 h-fit"
            >
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="font-mono text-indigo-400">${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                className="w-full mt-8 bg-gradient-to-r from-accent-blue to-accent-purple
                  hover:from-accent-purple hover:to-accent-blue text-white rounded-full px-6 py-3
                  transition-all duration-300 transform hover:scale-105
                  shadow-[0_0_10px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]
                  font-semibold"
              >
                Proceed to Checkout
              </button>

              <Link 
                href="/shop"
                className="block text-center mt-4 text-gray-400 hover:text-white transition-colors"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
} 