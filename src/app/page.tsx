"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Rocket, Star } from "lucide-react";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroBanner from "@/components/HeroBanner";

export default function HomePage() {
  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-7xl mx-auto">
        <HeroBanner />
        <FeaturedProducts />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-16 z-10"
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
            View All Products
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
