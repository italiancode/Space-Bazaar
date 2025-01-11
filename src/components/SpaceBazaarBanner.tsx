"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const floatingAnimation = {
  y: [0, -5, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const rocketAnimation = {
  x: [0, 10, 0],
  y: [0, -5, 0],
  rotate: [0, 5, 0],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function SpaceBazaarBanner() {
  return (
    <div className="relative overflow-hidden text-white px-4 py-3 md:mt-3 lg:mt-4 bg-gradient-to-r from-[#0a1128] to-[#1c3a70]/50">
      <div className="relative z-10 flex flex-row items-center justify-between max-w-7xl mx-auto">
        <div className="flex flex-row items-center mb-4 sm:mb-0">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-gray-300 mt-1"
            >
              Your SpaceX Merchandise Marketplace
            </motion.p>

            <motion.div
              className="flex items-center mt-2 "
              animate={floatingAnimation}
            >
              <Star className="w-3 h-3 mr-1 text-yellow-400" />
              <p className="text-[0.6rem] sm:text-xs text-gray-400 italic">
                Supporting future space missions
              </p>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-row items-center w-1/2 justify-end rounded-r-full">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-4"
          >
            <Link
              href="/shop"
              className="bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue)]/90 text-xs sm:text-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center whitespace-nowrap"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Shop Now
            </Link>
          </motion.div>
          {/* <motion.div animate={pulseAnimation}>
            <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-yellow-400 to-yellow-200 text-black px-2 py-1 rounded-full">
              New Arrivals
            </span>
          </motion.div> */}
        </div>
      </div>
    </div>
  );
}
