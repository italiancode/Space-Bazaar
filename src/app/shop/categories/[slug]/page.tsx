"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
// import StarryBackground from "@/components/effects/StarryBackground";
import ProductCard from "@/components/shop/ProductCard";
import products from "products.json"; // Import the products JSON

const categoryTitles = {
  "apparel": "SpaceX Apparel",
  "collectibles": "Space Collectibles",
  "models": "Spacecraft Models",
  "mission-gear": "Mission Gear"
};

export default function CategoryPage() {
  const { slug } = useParams();
  const categorySlug = Array.isArray(slug) ? slug[0] : slug || "";
  const filteredProducts = products.filter(product => product.category.toLowerCase() === categorySlug.toLowerCase());
  const title = categoryTitles[categorySlug as keyof typeof categoryTitles] || "Products";

  return (
    <div className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      {/* <StarryBackground className="z-0" /> */}
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent mb-6">
            {title}
          </h1>
          <p className="text-xl text-gray-400">
            Discover our collection of authentic SpaceX merchandise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
} 