"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import { StarryBackground } from "./background-effect/StarryBackground";
import {
  SpaceIcon as Planet,
  ShoppingCart,
  Star,
  CompassIcon as Comet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import SpaceBazaarBanner from "./SpaceBazaarBanner";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HeroBanner() {
  const [showDescription, setShowDescription] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setShowDescription(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    });
  }, [controls]);

  return (
    <div className="h-[70vh] sm:h-[80vh] max-h-[800px] overflow-auto relative bg-gradient-to-b from-[#0a1128] to-[#1c3a70]">
      <StarryBackground />
      <SpaceBazaarBanner />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center z-10 max-w-4xl mx-auto mt-32">
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-white to-[var(--accent-blue)] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -50 }}
            animate={controls}
          >
            Space Bazaar
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl md:text-3xl text-gray-200 mb-6 sm:mb-8"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Your SpaceX Merchandise Marketplace
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-row items-center justify-center gap-4 mb-8"
          >
            <Button
              size="lg"
              className={cn(
                "bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue)]/90",
                "px-6 py-2 sm:px-8 sm:py-3 lg:px-10 lg:py-4",
                "text-sm sm:text-base lg:text-lg font-semibold",
                "rounded-full shadow-md hover:shadow-lg transition-all duration-300",
                "flex items-center justify-center gap-2 whitespace-nowrap"
              )}
            >
              <ShoppingCart className="group-hover:animate-bounce w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              Start Shopping
            </Button>

            <Button
              size="lg"
              className={cn(
                "border border-white text-white hover:bg-white hover:text-[var(--accent-blue)]",
                "px-6 py-2 sm:px-8 sm:py-3 lg:px-10 lg:py-4",
                "text-sm sm:text-base lg:text-lg font-semibold",
                "rounded-full shadow-md hover:shadow-lg transition-all duration-300",
                "flex items-center justify-center gap-2 whitespace-nowrap"
              )}
            >
              <Star className="group-hover:animate-spin w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              Learn More
            </Button>
          </motion.div>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: showDescription ? 1 : 0,
              y: showDescription ? 0 : 20,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            An online marketplace where users can buy and sell SpaceX
            merchandise, with a portion of the profits going towards funding
            future space exploration missions.
          </motion.p>
        </div>
      </div>
    </div>
  );
}