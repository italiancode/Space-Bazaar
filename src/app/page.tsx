"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";
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
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16 z-10"
        >
          <Link
            href="/shop/collections"
            className="group inline-flex items-center justify-center
              border border-white px-6 py-3
              text-sm font-medium text-white
              transition-all duration-300 hover:bg-white hover:text-black"
          >
            <span className="mr-2"> Shop Now</span>
            <ShoppingBag className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
