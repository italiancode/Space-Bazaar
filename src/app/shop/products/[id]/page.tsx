"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import AddToCart from "@/components/shop/AddToCart";
import productsData from "@/data/products.json";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Truck, Shield, Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  
  if (!params || !params.id) {
    return <div>Product not found.</div>;
  }

  const productId = Number(params.id);
  const product = productsData.find((item) => item.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-space-dark">
        <p className="text-2xl text-gray-400">
          Product not found in this galaxy...
        </p>
      </div>
    );
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen pt-8 md:pt-24 pb-32 px-4 sm:px-6 lg:px-8 text-space-light z-[10]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square rounded-2xl overflow-hidden 
              bg-gradient-to-br from-space-accent/20 to-space-accent/10
              backdrop-blur-md border border-space-accent/30"
          >
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-space-dark/80 to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-4 left-4 right-4 bg-space-accent/20 backdrop-blur-md rounded-lg p-4"
            >
              <h2 className="text-xl font-semibold text-space-light mb-2">
                {product.name}
              </h2>
              <p className="text-space-light/80">{product.category}</p>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center z-10"
          >
            <h1
              className="text-3xl sm:text-4xl font-bold 
              bg-gradient-to-r from-space-light via-space-accent to-space-highlight bg-clip-text text-transparent"
            >
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mt-4">
              <Star className="w-5 h-5 text-space-highlight fill-space-highlight" />
              <span className="text-space-light/80">
                {product.ratings} ({product.reviews} reviews)
              </span>
            </div>

            <p className="text-2xl font-mono text-space-accent mt-4">
              ${product.price.toFixed(2)}
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-space-light/80">Quantity:</span>
                <div className="flex items-center space-x-2 bg-space-accent/20 rounded-full">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="p-2 text-space-light hover:bg-space-accent/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-l-full"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-sm text-space-light font-mono px-2">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className="p-2 text-space-light hover:bg-space-accent/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-r-full"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <AddToCart
                productId={product.id}
                quantity={quantity}
                disabled={product.stock === 0}
                className="w-full bg-space-accent hover:bg-space-accent/80 text-space-dark font-semibold py-3 rounded-lg transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center gap-2 text-space-light/80">
                <Truck className="w-5 h-5 text-space-highlight" />
                <span>Free Interstellar Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-space-light/80">
                <Shield className="w-5 h-5 text-space-highlight" />
                <span>1 Light-Year Warranty</span>
              </div>
            </div>

            {/* Tabs for Additional Information */}
            <div className="mt-12">
              <div className="flex space-x-4 border-b border-space-accent/30">
                {["description", "details", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 font-medium transition-colors ${
                      activeTab === tab
                        ? "text-space-highlight border-b-2 border-space-highlight"
                        : "text-space-light/60 hover:text-space-light"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4"
                >
                  {activeTab === "description" && (
                    <p className="text-space-light/80">{product.description}</p>
                  )}
                  {activeTab === "details" && (
                    <div className="grid grid-cols-2 gap-4 text-sm text-space-light/80">
                      <div>SKU: {product.sku}</div>
                      <div>Category: {product.category}</div>
                      <div>Stock: {product.stock} units</div>
                      <div>Weight: {product.weight}</div>
                      <div>Dimensions: {product.dimensions}</div>
                    </div>
                  )}
                  {activeTab === "reviews" && (
                    <div className="space-y-4">
                      <p className="text-space-light/80">
                        Customer reviews coming soon...
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
