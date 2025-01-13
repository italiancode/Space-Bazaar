"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import Link from "next/link";

const floatingAnimation = {
  y: [0, -2, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function SpaceBazaarBanner() {
  return (
    <div className="relative overflow-hidden text-white px-4 py-2 mt-auto mx-auto bg-gradient-to-r from-[#0a1128] to-[#1c3a70]/50 h-14">
      <div className="relative z-10 flex flex-row items-center justify-between max-w-7xl mx-auto h-full">
        <div className="flex flex-row items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs sm:text-sm text-gray-300"
            >
              Your SpaceX Merchandise Marketplace
            </motion.p>

            <motion.div
              className="flex items-center mt-1"
              animate={floatingAnimation}
            >
              <Star className="w-3 h-3 mr-1 text-yellow-400" />
              <p className="text-[0.5rem] sm:text-xs text-gray-400 italic">
                Supporting future space missions
              </p>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-row items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-4"
          >
            <Link
              href="/shop"
              className="bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue)]/90 text-xs sm:text-sm px-3 py-1 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center whitespace-nowrap"
            >
              <ShoppingCart className="w-3 h-3 mr-1" />
              Shop Now
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}