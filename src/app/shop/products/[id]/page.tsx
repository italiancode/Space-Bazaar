"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import AddToCart from "@/components/shop/AddToCart";
import productsData from "@/products.json";
import { motion } from "framer-motion";
import { Star, Truck, Shield } from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const productId = Number(id);
  const product = productsData.find((item) => item.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-gray-400">Product not found in this galaxy...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square rounded-2xl overflow-hidden 
              bg-gradient-to-br from-gray-800/50 to-gray-900/50
              backdrop-blur-md border border-gray-700/50"
          >
            <Image 
              src={product.image} 
              alt={product.name} 
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
            />
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-3xl sm:text-4xl font-bold 
              bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-2 mt-4">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="text-gray-400">{product.ratings} ({product.reviews} reviews)</span>
            </div>

            <p className="text-2xl font-mono text-indigo-400 mt-4">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-gray-300 mt-6">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center gap-2 text-gray-400">
                <Truck className="w-5 h-5" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="w-5 h-5" />
                <span>1 Year Warranty</span>
              </div>
            </div>

            <div className="mt-8">
              <AddToCart productId={product.id} />
            </div>

            {/* Additional Details */}
            <div className="mt-8 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50">
              <h3 className="font-semibold mb-2">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                <div>SKU: {product.sku}</div>
                <div>Category: {product.category}</div>
                <div>Stock: {product.stock} units</div>
                <div>Weight: {product.weight}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 