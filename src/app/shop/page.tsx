"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Rocket, Star } from "lucide-react";

export default function ShopPage() {
  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent mb-4">
            Space Bazaar Store
          </h1>
          <p className="text-xl text-gray-400">Your Gateway to Cosmic Collectibles</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: ShoppingBag, title: "Exclusive Products", desc: "Authentic SpaceX merchandise" },
            { icon: Rocket, title: "Fast Shipping", desc: "Worldwide delivery" },
            { icon: Star, title: "Premium Quality", desc: "Certified collectibles" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50
                backdrop-blur-md border border-gray-700/50
                hover:border-indigo-500/50 transition-all duration-300"
            >
              <feature.icon className="w-12 h-12 text-indigo-400 mb-4 mx-auto" />
              <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Link
            href="/shop/products" 
            className="inline-flex items-center gap-2 
              bg-gradient-to-r from-accent-blue to-accent-purple
              hover:from-accent-purple hover:to-accent-blue
              text-white rounded-full px-8 py-4 
              transition-all duration-300 transform hover:scale-105
              shadow-[0_0_10px_rgba(79,70,229,0.3)] 
              hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]
              text-lg font-semibold"
          >
            <ShoppingBag className="w-6 h-6" />
            Explore Products
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 