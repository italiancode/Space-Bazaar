"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";
import productsData from "@/products.json";

export default function ShopPage() {
  const recommendedProducts = productsData
    .filter(
      (product) =>
        // Example criteria - you can modify these based on your actual recommendation logic
        product.category === "popular" || product.ratings >= 4
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 relative p-12 rounded-2xl overflow-hidden
            bg-gradient-to-r from-transparent via-indigo-950/30 to-transparent
             backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent)] animate-pulse" />
          <div className="relative z-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">
              SpaceX Merch
            </h1>

            <p className="text-gray-400 mt-2">Discover our cosmic collection</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex justify-between items-center mb-8 whitespace-nowrap">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">
              Recommended For You
            </h2>
            <Link
              href="/shop/collections"
              className="ml-4 text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              View More →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Link
            href="/shop/collections"
            className="inline-flex items-center gap-2 
              bg-accent-purple
              text-white rounded px-4 py-2 
              transition-all duration-200 transform hover:scale-105
              text-lg font-semibold"
          >
            <ShoppingBag className="w-5 h-5" />
            Explore Collections
          </Link>
        </motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-space-dark to-transparent" />
    </div>
  );
}
