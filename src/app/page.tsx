"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
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
            href="/shop"
            className="inline-flex items-center gap-2 
              bg-accent-purple
              text-white rounded px-4 py-2 
              transition-all duration-200 transform hover:scale-105
              text-lg font-semibold"
          >
            <ShoppingBag className="w-5 h-5" />
            Shop Now
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
