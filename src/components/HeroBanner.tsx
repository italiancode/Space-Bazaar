"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import { StarryBackground } from "./effects/StarryBackground";
import { ShoppingCart, Store } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import SpaceBazaarBanner from "./SpaceBazaarBanner";
import Link from "next/link";
import { SpaceParticles } from "./SpaceParticles";

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
    <section className="h-[90vh] max-h-[800px] overflow-hidden relative bg-gradient-to-b from-[#0a1128] to-[#1c3a70] z-10">
      <div className="absolute inset-0 z-10">
        <StarryBackground />
      </div>
      <SpaceBazaarBanner />

      <div className="absolute inset-0 flex flex-col-reverse lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-8 mt-14">
        <div className="text-center lg:text-left z-20 max-w-4xl lg:w-1/2 mx-auto my-auto">
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
            Explore the Universe of SpaceX Collectibles
          </motion.p>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8"
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-row items-center justify-center lg:justify-start gap-4"
          >
            <Link
              href="/shop"
              className={cn(
                "bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue)]/90",
                "px-6 py-2 sm:px-8 sm:py-3 lg:px-10 lg:py-4",
                "text-sm sm:text-base lg:text-lg font-semibold",
                "rounded-full shadow-md hover:shadow-xl transition-all duration-300",
                "flex items-center justify-center gap-2 whitespace-nowrap"
              )}
            >
              <ShoppingCart className="group-hover:animate-bounce w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              Start Shopping
            </Link>

            <Link
              href="/about"
              className={cn(
                "border border-white text-white hover:bg-white hover:text-[var(--accent-blue)]",
                "px-6 py-2 sm:px-8 sm:py-3 lg:px-10 lg:py-4",
                "text-sm sm:text-base lg:text-lg font-semibold",
                "rounded-full shadow-md hover:shadow-lg transition-all duration-300",
                "flex items-center justify-center gap-2 whitespace-nowrap"
              )}
            >
              <Store className="group-hover:animate-spin w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              {" I'm a Seller"}
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="lg:w-1/2 w-full h-[400px] lg:h-[600px] max-w-xl px-4 mt-8 lg:mt-0 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="absolute inset-0 backdrop-blur-[2px]">
            <SpaceParticles />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
