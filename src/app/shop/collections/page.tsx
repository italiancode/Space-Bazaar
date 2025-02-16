"use client";

import ProductCard from "@/components/shop/ProductCard";
import productsData from "@/products.json";
import { motion } from "framer-motion";

export default function ProductsPage() {
  return (
    <div className="min-h-screen pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 relative p-12 rounded-2xl overflow-hidden
            bg-gradient-to-r from-transparent via-indigo-950/30 to-transparent
            border border-white/10 backdrop-blur-sm"
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {productsData.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
