"use client";

import { motion } from "framer-motion";
import { StarryBackground } from "./effects/StarryBackground";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function HeroBanner() {
  const [showDescription, setShowDescription] = useState(false);
  // const controls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setShowDescription(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="h-[60vh] md:h-[75vh] max-h-[800px] min-h-[500px] overflow-hidden relative bg-gradient-to-b from-[#0a1128] to-[#1c3a70] z-10">
      <div className="absolute inset-0 z-10">
        <StarryBackground />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center z-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                Space Bazaar
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: showDescription ? 1 : 0 }}
              transition={{ duration: 1 }}
              className="mt-8 text-xl sm:text-2xl text-gray-300/90 max-w-2xl mx-auto font-light"
            >
              Discover authentic space collectibles and gear from the frontiers
              of exploration
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12"
          >
            <Link
              href="/shop"
              className="group relative inline-flex items-center justify-center
                bg-gradient-to-r from-accent-blue to-accent-purple px-8 py-3
                text-lg font-medium text-white overflow-hidden rounded-full
                transition-all duration-300
                hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Explore Collection
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
